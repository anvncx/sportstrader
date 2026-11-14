import React, { useRef } from 'react';
import { ArrowRight, Crosshair, ShieldCheck, Trophy } from 'lucide-react';
import { AnimatedBeam } from '../components/AnimatedBeam.jsx';
import ShimmerButton from '../components/ShimmerButton.jsx';

export default function HowItWorksPage() {
  const board = useRef(null);
  const nodes = [useRef(null), useRef(null), useRef(null)];
  const steps = [
    { label: 'THE START', title: 'Choose your account', body: 'Purchase a challenge account and begin your Sportstrader journey.', Icon: Crosshair },
    { label: 'THE PROCESS', title: 'Prove your strategy', body: 'Demonstrate disciplined sports trading while following the platform rules.', Icon: ShieldCheck },
    { label: 'THE NEXT STAGE', title: 'Become funded', body: 'Progress to the funded stage according to the platform’s terms.', Icon: Trophy }
  ];
  return <main className="subpage how-page">
    <section className="subpage-hero"><div className="shell subpage-hero-inner"><div className="eyebrow"><span className="eyebrow-line"/> The process</div><h1>How it<br/><span>works.</span></h1><p>Three clear stages take you from challenge account to funded Sportstrader.</p><ShimmerButton as="a" className="button" href="/index.html#account">View the challenge <ArrowRight size={17}/></ShimmerButton><span className="subpage-index">01 <i>/</i> THE ROUTE</span></div></section>
    <section className="subpage-content section-pad"><div className="shell"><div className="subpage-section-heading"><div><span className="micro-label">YOUR SPORTSTRADER JOURNEY</span><h2>Start focused.<br/><span>Move with purpose.</span></h2></div><p>Follow each stage and keep the published betting rules in view as you go.</p></div>
      <div className="process-board" ref={board}>
        <AnimatedBeam containerRef={board} fromRef={nodes[0]} toRef={nodes[1]} curvature={-16}/>
        <AnimatedBeam containerRef={board} fromRef={nodes[1]} toRef={nodes[2]} curvature={16}/>
        <div className="process-grid">{steps.map(({label,title,body,Icon},i)=><article className="process-card" key={title}><div className="process-node" ref={nodes[i]}><span>0{i+1}</span><Icon size={21}/></div><span className="step-tag">{label}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
      <div className="process-rule-note"><ShieldCheck size={17}/><span><b>Keep the rules close.</b> Minimum combined odds 3.20, minimum 1.60 per match, full-time markets only.</span><a href="/index.html#account">See account rules <ArrowRight size={14}/></a></div>
    </div></section>
    <section className="subpage-end"><div className="shell subpage-end-row"><div><span className="micro-label">YOUR FIRST STEP</span><h2>Begin with the<br/><span>challenge account.</span></h2></div><ShimmerButton as="a" className="button" href="/index.html#account">Explore the account <ArrowRight size={17}/></ShimmerButton></div></section>
  </main>;
}
