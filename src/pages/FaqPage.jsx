import React, { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';
import ShimmerButton from '../components/ShimmerButton.jsx';

const items = [
  ['What is Sportstrader?', 'Sportstrader gives sports bettors access to funded betting accounts after purchasing an account challenge. We call our community Sportstraders.'],
  ['How much does an account cost?', 'The ₦100,000 account challenge is priced at ₦2,900.'],
  ['What is the minimum combined odds?', 'Each bet must have minimum combined odds of 3.20.'],
  ['What is the minimum odds per match?', 'Each individual match in a bet must have minimum odds of 1.60.'],
  ['Which sports are supported?', 'Football and basketball are supported. All betting must be on full-time markets.'],
  ['What does becoming a funded Sportstrader mean?', 'It means progressing to the funded stage after demonstrating disciplined sports trading and following the platform’s terms.']
];

export default function FaqPage() {
  const [open, setOpen] = useState(0);
  return <main className="subpage faq-page">
    <section className="subpage-hero"><div className="shell subpage-hero-inner"><div className="eyebrow"><span className="eyebrow-line"/> The essentials</div><h1>Good to<br/><span>know.</span></h1><p>Clear answers about the account challenge, betting rules and funded stage.</p><span className="subpage-index">02 <i>/</i> FAQ</span><CircleHelp className="faq-hero-icon" strokeWidth={.7}/></div></section>
    <section className="subpage-content section-pad"><div className="shell faq-page-layout"><div className="faq-page-aside"><span className="micro-label">SPORTSTRADER / HELP</span><h2>Questions,<br/><span>answered.</span></h2><p>For account details, start with the challenge summary on the home page.</p><a href="/index.html#account">See the account details <span>↗</span></a></div><div className="faq-page-list">{items.map(([question,answer],index)=><div className={`faq-item ${open===index?'active':''}`} key={question}><ShimmerButton type="button" className="faq-question" contentClassName="shimmer-button-content faq-question-content" shimmerColor="rgba(183,243,74,.32)" duration="4.5s" onHoverOnly aria-expanded={open===index} onClick={() => setOpen(open===index?null:index)}><span className="faq-number">0{index+1}</span><span>{question}</span><ChevronDown size={17}/></ShimmerButton><div className="faq-answer"><div><p>{answer}</p></div></div></div>)}</div></div></section>
  </main>;
}
