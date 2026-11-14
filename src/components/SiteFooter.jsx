import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './SiteHeader.jsx';
import ShimmerButton from './ShimmerButton.jsx';

export default function SiteFooter() {
  return <footer className="footer"><div className="shell">
    <div className="footer-main"><div className="footer-brand"><Logo/><p>Built for disciplined Sportstraders.</p></div><div className="footer-col"><span>EXPLORE</span><a href="/how-it-works.html">How it works</a><a href="/rules.html">Trading rules</a><a href="/index.html#markets">Markets</a><a href="/faq.html">FAQ</a></div><div className="footer-col"><span>INFORMATION</span><a href="/index.html#terms">Terms and Conditions</a><a href="/index.html#privacy">Privacy Policy</a><a href="mailto:hello@sportstrader.ng">Contact</a></div><div className="footer-cta"><span>Ready when you are.</span><ShimmerButton as="a" className="footer-shimmer-link" href="/index.html#account">Get the challenge <ArrowUpRight size={15}/></ShimmerButton></div></div>
    <div className="footer-bottom"><span>© 2026 Sportstrader</span><span className="responsible">Please bet responsibly.</span><span>NIGERIA <i>·</i> SPORTS TRADING</span></div>
  </div></footer>;
}
