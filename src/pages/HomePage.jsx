import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CircleHelp, Crosshair, ShieldCheck } from 'lucide-react';
import FluxLines from '../components/FluxLines.jsx';
import { AnimatedBeam } from '../components/AnimatedBeam.jsx';
import ShimmerButton from '../components/ShimmerButton.jsx';
import './HomePage.css';

const ACCOUNT_SIZES = [100000, 200000, 300000, 400000, 500000];
const CHALLENGE_PRICES = [2900, 5900, 8900, 11900, 14900];
const formatNaira = amount => `₦${amount.toLocaleString('en-NG')}`;

export default function HomePage() {
  const [accountSize, setAccountSize] = useState(ACCOUNT_SIZES[0]);
  const [oddsTarget, setOddsTarget] = useState(3.2);
  const [targetHelp, setTargetHelp] = useState(null);
  const flowRef = useRef(null);
  const accountRef = useRef(null);
  const actionRef = useRef(null);
  const sizeIndex = ACCOUNT_SIZES.indexOf(accountSize);
  const basePrice = CHALLENGE_PRICES[sizeIndex];
  const challengePrice = oddsTarget === 6.2 ? Math.round(basePrice * 0.7) : basePrice;

  return <main id="top">
    <section className="hero hero-new">
      <div className="hero-grid" aria-hidden="true"/>
      <FluxLines className="hero-flux" colors={['#ffffff','#ffffff','#ffffff']} glow={2} rimWidth={0.2} lineWidth={1} flowDirection="down" mouseInteraction clickSwirl/>
      <div className="hero-shade" aria-hidden="true"/>
      <div className="hero-inner shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> Sports knowledge, capitalized</div>
          <h1>Your Sports Knowledge.<br/><span>Our Capital.</span></h1>
          <p className="hero-lede">Trade football and basketball markets with our capital.</p>
          <div className="hero-ctas"><ShimmerButton as="a" className="button" href="#account">Start Your Challenge. <ArrowRight size={17}/></ShimmerButton><a className="text-link" href="/how-it-works.html">See how it works <ArrowUpRight size={15}/></a></div>
          <div className="hero-footnote"><span className="hero-footnote-dot"/> Built for disciplined Sportstraders</div>
        </div>
      </div>
      <div className="hero-bottom shell"><span>FOOTBALL <i/> BASKETBALL <i/> FULL-TIME MARKETS</span><span className="hero-scroll">SCROLL TO EXPLORE <b>↓</b></span></div>
    </section>

    <div className="landing-flow" ref={flowRef}>
      <AnimatedBeam className="landing-beam" containerRef={flowRef} fromRef={accountRef} toRef={actionRef} curvature={0}/>

      <section className="flow-section account-section" id="account">
        <div className="shell flow-shell account-new-layout">
          <span className="flow-marker" ref={accountRef} aria-label="Account and rules section"><b>01</b></span>
          <div className="account-heading"><div className="eyebrow"><span className="eyebrow-line"/> The challenge</div><h2>One account.<br/><span>Clear rules.</span></h2><p>Everything you need to start, in one place.</p><div className="account-aside-note"><ShieldCheck size={17}/> Built around disciplined play.</div></div>
          <div className="purchase-card">
            <div className="purchase-top"><div><span className="micro-label">SPORTSTRADER CHALLENGE</span><h3>Standard account</h3></div><span className="offer-badge"><i/> Open</span></div>
            <div className="purchase-numbers"><div><span className="micro-label">ACCOUNT SIZE</span><strong>{formatNaira(accountSize)}</strong></div><div><span className="micro-label">CHALLENGE PRICE</span><strong className="lime-number">{formatNaira(challengePrice)}</strong>{oddsTarget === 6.2 && <div className="discount-detail"><del>{formatNaira(basePrice)}</del><span>30% OFF</span></div>}</div></div>
            <div className="account-size-control"><div className="selector-heading"><label htmlFor="account-size-slider">Select account size</label><span>{sizeIndex + 1} / {ACCOUNT_SIZES.length}</span></div><input id="account-size-slider" className="account-size-slider" type="range" min="0" max={ACCOUNT_SIZES.length - 1} step="1" value={sizeIndex} aria-valuetext={`${formatNaira(accountSize)} account`} onChange={event => setAccountSize(ACCOUNT_SIZES[Number(event.target.value)])}/><div className="account-size-options" aria-label="Choose account size">{ACCOUNT_SIZES.map(size => <ShimmerButton key={size} type="button" className={size === accountSize ? 'selected' : ''} shimmerColor="rgba(183,243,74,.55)" duration="4s" onHoverOnly aria-pressed={size === accountSize} onClick={() => setAccountSize(size)}>{size / 1000}k</ShimmerButton>)}</div></div>
            <div className="purchase-specs"><div><span className="spec-symbol"><Crosshair size={16}/></span><span><small>Sports</small><b>Football &amp; basketball</b></span></div></div>
            <fieldset className="odds-target-control"><legend className="micro-label">CHALLENGE BETSLIP ODDS TARGET</legend><div className="odds-target-options">
              <div className="target-option"><label className={oddsTarget === 3.2 ? 'target-choice selected' : 'target-choice'}><input type="radio" name="odds-target" value="3.2" checked={oddsTarget === 3.2} onChange={() => setOddsTarget(3.2)}/><span className="target-value">3.20</span><span className="target-caption">Standard price</span></label><button className="target-help-button" type="button" aria-label="How the 3.20 target works" aria-expanded={targetHelp === 3.2} aria-controls="target-help-32" onClick={() => setTargetHelp(targetHelp === 3.2 ? null : 3.2)}><CircleHelp size={14}/></button></div>
              <div className="target-option"><label className={oddsTarget === 6.2 ? 'target-choice selected' : 'target-choice'}><input type="radio" name="odds-target" value="6.2" checked={oddsTarget === 6.2} onChange={() => setOddsTarget(6.2)}/><span className="target-value">6.20</span><span className="target-caption">30% off</span></label><button className="target-help-button" type="button" aria-label="How the 6.20 target works" aria-expanded={targetHelp === 6.2} aria-controls="target-help-62" onClick={() => setTargetHelp(targetHelp === 6.2 ? null : 6.2)}><CircleHelp size={14}/></button></div>
            </div><div className={`target-help-copy ${targetHelp === 3.2 ? 'is-open' : ''}`} id="target-help-32" hidden={targetHelp !== 3.2}>Your challenge betslip needs combined odds of at least 3.20. Each selection must be at least 1.60 odds, with two or more selections. Standard price applies.</div><div className={`target-help-copy ${targetHelp === 6.2 ? 'is-open' : ''}`} id="target-help-62" hidden={targetHelp !== 6.2}>Your challenge betslip needs combined odds of at least 6.20. Each selection must be at least 1.60 odds, with two or more selections. The challenge price is 30% lower.</div></fieldset>
            <div className="purchase-actions"><ShimmerButton as="a" className="button purchase-button" href="/how-it-works.html">See the steps <ArrowRight size={15}/></ShimmerButton><ShimmerButton as="a" className="button purchase-button rules-button" href="/rules.html">View Rules <ShieldCheck size={15}/></ShimmerButton></div>
          </div>
        </div>
      </section>

      <section className="flow-section final-cta">
        <div className="cta-grid" aria-hidden="true"/>
        <div className="shell flow-shell cta-inner">
          <span className="flow-marker" ref={actionRef} aria-label="Start the challenge"><b>03</b></span>
          <div className="cta-content"><div className="eyebrow"><span className="eyebrow-line"/> Your next move</div><h2>Ready to trade<br/><span>differently?</span></h2><div className="cta-bottom"><p>Put your sports knowledge to work.<br/>Start your Sportstrader journey today.</p><ShimmerButton as="a" className="button" href="#account">Get your account <ArrowRight size={17}/></ShimmerButton></div></div>
          <div className="cta-giant-mark" aria-hidden="true">ST<span>.</span></div>
        </div>
      </section>
    </div>
  </main>;
}
