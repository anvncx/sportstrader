import React from 'react';
import { ArrowRight } from 'lucide-react';
import './RulesPage.css';
import ShimmerButton from '../components/ShimmerButton.jsx';

export default function RulesPage() {
  return <main className="subpage rules-page">
    <section className="subpage-hero"><div className="shell subpage-hero-inner"><div className="eyebrow"><span className="eyebrow-line"/> The rulebook</div><h1>Rules &amp;<br/><span>account info.</span></h1><p>Know what applies during the challenge and after you reach the funded stage.</p><span className="subpage-index">03 <i>/</i> RULES</span></div></section>

    <section className="rules-page-section section-pad"><div className="shell rules-text-layout">
      <section className="rules-text-block" aria-labelledby="challenge-rules-title"><div className="rules-stage-index">01 <span>/ CHALLENGE</span></div><div className="eyebrow"><span className="eyebrow-line"/> The qualification stage</div><h2 id="challenge-rules-title">Challenge rules</h2><ol className="plain-rules-list"><li>Every betslip must have combined odds of at least <strong>3.20</strong> or <strong>6.20</strong>, according to the odds target selected for the challenge.</li><li>Each selection within a betslip must have odds of at least <strong>1.60</strong>.</li><li>A betslip must contain at least <strong>two selections</strong>.</li><li>You must win your challenge betslip to qualify for a funded account. A losing betslip results in an immediate account breach.</li></ol></section>
      <section className="rules-text-block funded-text-block" aria-labelledby="funded-rules-title"><div className="rules-stage-index">02 <span>/ FUNDED</span></div><div className="eyebrow"><span className="eyebrow-line"/> The funded stage</div><h2 id="funded-rules-title">Funded account rules</h2><ol className="plain-rules-list"><li>Every betslip must have combined odds of at least <strong>2.00</strong>.</li><li>There is no minimum odds requirement for individual selections.</li><li>Your maximum permitted profit on a single betslip is <strong>100% of your account size</strong>. Any profit above this limit will be deducted.<p className="rules-example"><strong>Example:</strong> On a ₦100,000 account, the maximum winnings for one betslip is ₦100,000. Any excess profit will be removed.</p></li><li>Your funded account is breached only if you lose <strong>two consecutive betslips</strong>. A winning betslip resets your consecutive-loss count.</li></ol></section>
    </div></section>

    <section className="subpage-end"><div className="shell subpage-end-row"><div><span className="micro-label">READY TO START?</span><h2>Take the rules<br/><span>into your challenge.</span></h2></div><ShimmerButton as="a" className="button" href="/index.html#account">View the account <ArrowRight size={17}/></ShimmerButton></div></section>
  </main>;
}
