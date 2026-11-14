import React from 'react';
import { ArrowRight, Check, ShieldAlert, ShieldCheck, TrendingUp } from 'lucide-react';
import './RulesPage.css';
import ShimmerButton from '../components/ShimmerButton.jsx';

const challengeRules = [
  { value: '3.20 / 6.20', label: 'Minimum combined odds', detail: 'Every betslip must meet the combined odds target selected for the challenge: 3.20 or 6.20.' },
  { value: '1.60', label: 'Minimum selection odds', detail: 'Each selection inside a betslip must have odds of at least 1.60.' },
  { value: '2+', label: 'Minimum selections', detail: 'A betslip must contain at least two selections.' },
  { value: 'ONE', label: 'One chance', detail: 'Win your challenge betslip to qualify for a funded account. A losing betslip results in an immediate account breach.' }
];

export default function RulesPage() {
  return <main className="subpage rules-page">
    <section className="subpage-hero"><div className="shell subpage-hero-inner"><div className="eyebrow"><span className="eyebrow-line"/> The rulebook</div><h1>Rules &amp;<br/><span>account info.</span></h1><p>Know what applies during the challenge and after you reach the funded stage.</p><span className="subpage-index">03 <i>/</i> RULES</span></div></section>

    <section className="rules-page-section section-pad"><div className="shell rules-page-shell">
      <div className="rules-stage-heading"><div className="rules-stage-index">01 <span>/ CHALLENGE</span></div><div><div className="eyebrow"><span className="eyebrow-line"/> The qualification stage</div><h2>Challenge<br/><span>rules.</span></h2><p>Win your challenge betslip to qualify for a funded account.</p></div></div>
      <div className="challenge-rules-grid">{challengeRules.map((rule,index)=><article className={`challenge-rule-card ${index===3?'challenge-one-shot':''}`} key={rule.label}><span className="rule-card-index">0{index+1}</span><strong className="challenge-rule-value">{rule.value}</strong><div className="challenge-rule-copy"><h3>{rule.label}</h3><p>{rule.detail}</p></div></article>)}</div>
      <div className="one-shot-note"><ShieldAlert size={18}/><p><b>One chance during the challenge.</b> A winning challenge betslip qualifies you for a funded account. A loss breaches the account.</p></div>
    </div></section>

    <section className="funded-rules-section section-pad"><div className="shell funded-rules-shell">
      <div className="rules-stage-heading"><div className="rules-stage-index">02 <span>/ FUNDED</span></div><div><div className="eyebrow"><span className="eyebrow-line"/> The funded stage</div><h2>Funded<br/><span>account rules.</span></h2><p>Different betslip minimums, plus a clear cap on profit per betslip.</p></div></div>
      <div className="funded-rules-content">
        <div className="funded-rule-list">
          <article className="funded-rule"><span className="funded-rule-icon"><TrendingUp size={17}/></span><div><h3>Minimum combined odds</h3><p>Every betslip must have combined odds of at least <b>2.00</b>.</p></div><strong className="funded-rule-value">2.00</strong></article>
          <article className="funded-rule"><span className="funded-rule-icon"><Check size={17}/></span><div><h3>Selection odds</h3><p>There is no minimum odds requirement for individual selections.</p></div><span className="no-minimum">NO MINIMUM</span></article>
          <article className="funded-rule profit-cap-rule"><span className="funded-rule-icon"><TrendingUp size={17}/></span><div><h3>Maximum profit per betslip</h3><p>Your maximum permitted profit on one betslip is <b>100% of your account size</b>. Any profit above this limit will be deducted.</p></div><strong className="funded-rule-value">100%</strong></article>
        </div>
        <aside className="profit-example"><span className="micro-label">PROFIT CAP EXAMPLE</span><div className="example-account"><span>Account size</span><strong>₦100,000</strong></div><div className="example-line"/><div className="example-profit"><span>Maximum win per betslip</span><strong>₦100,000</strong></div><p>Any profit above the account size on a single betslip will be removed.</p></aside>
      </div>
      <div className="loss-rule-panel"><div className="loss-rule-icon"><ShieldCheck size={20}/></div><div className="loss-rule-main"><span className="micro-label">ACCOUNT BREACH</span><h3>Two consecutive losing betslips.</h3><p>Your funded account is breached only if you lose two betslips in a row. A winning betslip resets your consecutive-loss count.</p></div><div className="loss-sequence" aria-label="Two losses in a row result in a breach"><span className="loss-dot">L</span><span className="loss-connector"/><span className="loss-dot">L</span><ArrowRight size={14}/><span className="breach-mark">BREACH</span></div></div>
    </div></section>

    <section className="subpage-end"><div className="shell subpage-end-row"><div><span className="micro-label">READY TO START?</span><h2>Take the rules<br/><span>into your challenge.</span></h2></div><ShimmerButton as="a" className="button" href="/index.html#account">View the account <ArrowRight size={17}/></ShimmerButton></div></section>
  </main>;
}
