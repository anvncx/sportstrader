import React from 'react';
import HomePage from './pages/HomePage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import RulesPage from './pages/RulesPage.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';

export default function App() {
  const path = window.location.pathname.toLowerCase();
  const currentPage = path.endsWith('/how-it-works.html') ? 'how' : path.endsWith('/faq.html') ? 'faq' : path.endsWith('/rules.html') ? 'rules' : 'home';
  const Page = currentPage === 'how' ? HowItWorksPage : currentPage === 'faq' ? FaqPage : currentPage === 'rules' ? RulesPage : HomePage;
  return <><SiteHeader currentPage={currentPage}/><Page/><SiteFooter/></>;
}
