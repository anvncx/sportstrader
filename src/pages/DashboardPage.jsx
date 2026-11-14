import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, BadgeCheck, CircleHelp, Plus, WalletCards } from 'lucide-react';
import { SignInButton, useAuth } from '@clerk/react';
import { Authenticated, useConvexAuth, useMutation, usePaginatedQuery, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import { ACCOUNT_SIZES, getAccountProfit } from '../lib/accounts.js';
import './DashboardPage.css';

const money = value => `₦${value.toLocaleString('en-NG')}`;
const clerkConfigured = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const convexConfigured = Boolean(import.meta.env.VITE_CONVEX_URL);

export default function DashboardPage() {
  if (!clerkConfigured || !convexConfigured) {
    return <DashboardSetupNeeded clerkConfigured={clerkConfigured} convexConfigured={convexConfigured}/>;
  }
  return <DashboardAuthGate/>;
}

function DashboardSetupNeeded({ clerkConfigured, convexConfigured }) {
  return <main className="dashboard-page"><div className="dashboard-shell"><section className="dashboard-connect-state"><div className="empty-icon"><WalletCards size={20}/></div><div className="dash-eyebrow">DASHBOARD SETUP</div><h1>Connect your account</h1><p>The dashboard uses Clerk for sign-in and Convex for account storage. Add the required deployment settings and restart the app to continue.</p><ul><li className={clerkConfigured ? 'setup-done' : ''}>Clerk publishable key <span>{clerkConfigured ? 'Configured' : 'Missing'}</span></li><li className={convexConfigured ? 'setup-done' : ''}>Convex deployment URL <span>{convexConfigured ? 'Configured' : 'Missing'}</span></li></ul></section></div></main>;
}

function DashboardAuthGate() {
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (!clerkLoaded || isLoading) return <DashboardStatus message="Connecting securely to your dashboard…"/>;
  if (!isSignedIn) return <main className="dashboard-page"><div className="dashboard-shell"><section className="dashboard-connect-state"><div className="empty-icon"><WalletCards size={20}/></div><div className="dash-eyebrow">SPORTSTRADER TERMINAL</div><h1>Sign in to continue</h1><p>Your accounts and profit summary are securely stored in your Sportstrader account.</p><SignInButton mode="modal"><button className="dash-primary" type="button">Sign in</button></SignInButton></section></div></main>;
  if (!isAuthenticated) return <main className="dashboard-page"><div className="dashboard-shell"><section className="dashboard-connect-state"><div className="empty-icon"><WalletCards size={20}/></div><div className="dash-eyebrow">CONVEX AUTH SETUP</div><h1>Finish connecting Clerk</h1><p>Confirm that the Convex integration is enabled in Clerk, the JWT template is named <b>convex</b>, and the Clerk issuer domain is set in this Convex deployment.</p></section></div></main>;
  return <Authenticated><DashboardContent/></Authenticated>;
}

function DashboardStatus({ message }) {
  return <main className="dashboard-page"><div className="dashboard-shell"><section className="dashboard-connect-state"><div className="empty-icon"><WalletCards size={20}/></div><h1>{message}</h1></section></div></main>;
}

function DashboardContent() {
  const summary = useQuery(api.accounts.getDashboardSummary, {});
  const { results: accounts, status: accountsStatus, loadMore } = usePaginatedQuery(api.accounts.listMine, {}, { initialNumItems: 10 });
  const createAccount = useMutation(api.accounts.createFreeTestAccount);
  const [size, setSize] = useState(100000);
  const [oddsTarget, setOddsTarget] = useState(3.2);
  const [showCreator, setShowCreator] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const addAccount = async () => {
    setCreating(true);
    setError('');
    try {
      await createAccount({ size, oddsTarget });
      setShowCreator(false);
    } catch {
      setError('Could not create the account. Check your Convex deployment and try again.');
    } finally {
      setCreating(false);
    }
  };

  if (!summary || accountsStatus === 'LoadingFirstPage') return <DashboardStatus message="Loading your accounts…"/>;

  return <main className="dashboard-page">
    <div className="dashboard-shell">
      <header className="dashboard-heading">
        <div><div className="dash-eyebrow"><span/> SPORTSTRADER TERMINAL</div><h1>Dashboard<span>.</span></h1><p>Your account overview and profit summary.</p></div>
        <ShimmerButton type="button" className="dash-primary" onClick={() => setShowCreator(open => !open)}><Plus size={17}/>{showCreator ? 'Close' : 'Get a free test account'}</ShimmerButton>
      </header>

      <section className="dashboard-metrics" aria-label="Account summary">
        <article className="metric-panel"><div className="metric-label"><span>ACTIVE ACCOUNTS</span><WalletCards size={16}/></div><strong>{summary.activeCount}</strong><p>Accounts currently active</p></article>
        <article className="metric-panel metric-highlight"><div className="metric-label"><span>WITHDRAWABLE PROFIT</span><ArrowDownToLine size={16}/></div><strong>{money(summary.withdrawableProfit)}</strong><p>60% of positive profit across active accounts</p></article>
      </section>

      {showCreator && <section className="account-creator" aria-labelledby="create-account-heading">
        <div className="creator-top"><div><span className="dash-eyebrow">TESTING MODE</span><h2 id="create-account-heading">Create a free account</h2><p>Choose an account size and challenge odds target. No payment is taken during testing.</p></div><span className="free-pill">FREE</span></div>
        <div className="creator-fields"><fieldset><legend>ACCOUNT SIZE</legend><div className="creator-options">{ACCOUNT_SIZES.map(amount => <button key={amount} type="button" onClick={() => setSize(amount)} className={size === amount ? 'creator-choice is-selected' : 'creator-choice'} aria-pressed={size === amount}>{amount / 1000}k</button>)}</div></fieldset><fieldset><legend>CHALLENGE BETSLIP ODDS TARGET</legend><div className="creator-options">{[3.2, 6.2].map(target => <button key={target} type="button" onClick={() => setOddsTarget(target)} className={oddsTarget === target ? 'creator-choice is-selected' : 'creator-choice'} aria-pressed={oddsTarget === target}>{target.toFixed(2)} odds</button>)}</div></fieldset></div>
        <div className="creator-footer"><span>Starting balance <b>{money(size)}</b></span><ShimmerButton type="button" className="dash-primary" onClick={addAccount} disabled={creating}>{creating ? 'Creating…' : 'Create account'} <ArrowUpRight size={16}/></ShimmerButton></div>
        {error && <p className="dashboard-error" role="alert">{error}</p>}
      </section>}

      <section className="account-list-section" aria-labelledby="accounts-heading">
        <div className="list-heading"><div><span className="dash-eyebrow">YOUR PORTFOLIO</span><h2 id="accounts-heading">Accounts <span>{summary.activeCount.toString().padStart(2, '0')}</span></h2></div><a href="/rules.html">Review rules <ArrowUpRight size={14}/></a></div>
        {accounts.length ? <div className="account-table-wrap"><table className="account-table"><thead><tr><th>ACCOUNT</th><th>STATUS</th><th>STARTING BALANCE</th><th>CURRENT BALANCE</th><th>PROFIT</th></tr></thead><tbody>{accounts.map(account => {
          const profit = getAccountProfit(account);
          return <tr key={account.id}><td><strong>{money(account.size)}</strong><small>Challenge · {account.oddsTarget.toFixed(2)} odds target</small></td><td><span className="status-tag"><i/> Active</span></td><td>{money(account.startingBalance)}</td><td>{money(account.balance)}</td><td className={profit > 0 ? 'profit-positive' : ''}>{money(profit)}</td></tr>;
        })}</tbody></table>{accountsStatus === 'CanLoadMore' && <div className="account-load-more"><button type="button" onClick={() => loadMore(10)}>Load more accounts</button></div>}</div> : accountsStatus === 'Exhausted' ? <div className="account-empty"><div className="empty-icon"><WalletCards size={20}/></div><h3>No active accounts yet</h3><p>Create a free test account to see it in your portfolio.</p><button type="button" onClick={() => setShowCreator(true)}>Create test account <Plus size={15}/></button></div> : null}
      </section>
      <aside className="profit-note"><CircleHelp size={16}/><p><b>How withdrawable profit is calculated</b><br/>For each active account, only balance above its starting balance counts as profit. Profits below the starting balance count as ₦0. Withdrawable profit is 60% of the sum of those positive amounts.</p></aside>
      <p className="dashboard-demo-note"><BadgeCheck size={14}/> Testing mode · Accounts are securely stored in Convex.</p>
    </div>
  </main>;
}
