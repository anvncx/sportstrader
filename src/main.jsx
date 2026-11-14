import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/react';
import './styles.css';
import './auth.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const application = <App />;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {publishableKey ? <ClerkProvider publishableKey={publishableKey}>{application}</ClerkProvider> : application}
  </React.StrictMode>,
);
