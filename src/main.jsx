import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ClerkProvider, useAuth } from '@clerk/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import './styles.css';
import './auth.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null;

function AuthAwareApp() {
  const { isLoaded, isSignedIn } = useAuth();
  const isDashboard = window.location.pathname.toLowerCase().endsWith('/dashboard.html');

  useEffect(() => {
    if (isLoaded && isSignedIn && !isDashboard) {
      window.location.replace('/dashboard.html');
    }
  }, [isDashboard, isLoaded, isSignedIn]);

  if (isLoaded && isSignedIn && !isDashboard) {
    return <div className="auth-redirect-loading" role="status" aria-live="polite">Opening your dashboard…</div>;
  }

  return <App />;
}

function AuthenticatedApp() {
  return convexClient
    ? <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}><AuthAwareApp /></ConvexProviderWithClerk>
    : <AuthAwareApp />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {publishableKey ? <ClerkProvider publishableKey={publishableKey}><AuthenticatedApp /></ClerkProvider> : <App />}
  </React.StrictMode>,
);
