import React, { useState } from 'react';
import { ArrowUpRight, Crosshair, Menu, X } from 'lucide-react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import ShimmerButton from './ShimmerButton.jsx';

const clerkConfigured = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export function Logo() {
  return <a href="/index.html" className="brand" aria-label="Sportstrader home"><span className="brand-mark"><Crosshair size={17} strokeWidth={1.8}/></span><span>sports<span className="brand-light">trader</span></span></a>;
}

export default function SiteHeader({ currentPage = 'home' }) {
  const [open, setOpen] = useState(false);
  const marketsHref = currentPage === 'home' ? '#markets' : '/index.html#markets';
  const close = () => setOpen(false);
  return <header className="site-header"><nav className="nav shell" aria-label="Main navigation">
    <Logo/>
    <ShimmerButton type="button" className="menu-toggle" contentClassName="shimmer-button-content menu-toggle-content" shimmerColor="rgba(183,243,74,.55)" duration="4s" onHoverOnly onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</ShimmerButton>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      <a className={currentPage === 'how' ? 'nav-active' : ''} href="/how-it-works.html" onClick={close}>How it works</a>
      <a href={marketsHref} onClick={close}>Markets</a>
      <a className={currentPage === 'rules' ? 'nav-active' : ''} href="/rules.html" onClick={close}>Rules</a>
      <a className={currentPage === 'faq' ? 'nav-active' : ''} href="/faq.html" onClick={close}>FAQ</a>
      <a className={currentPage === 'dashboard' ? 'nav-active' : ''} href="/dashboard.html" onClick={close}>Dashboard</a>
      {clerkConfigured ? <>
        <Show when="signed-out">
          <SignInButton mode="modal"><button className="nav-auth-link" type="button" onClick={close}>Login</button></SignInButton>
          <SignUpButton mode="modal"><button className="nav-auth-link nav-signup-link" type="button" onClick={close}>Create account</button></SignUpButton>
        </Show>
        <Show when="signed-in"><span className="nav-user"><UserButton /></span></Show>
      </> : <button className="nav-auth-link" type="button" disabled title="Add VITE_CLERK_PUBLISHABLE_KEY to enable sign-in">Login</button>}
      <ShimmerButton as="a" href="/index.html#account" className="button button-small nav-cta" onClick={close}>Get the challenge <ArrowUpRight size={15}/></ShimmerButton>
    </div>
  </nav></header>;
}
