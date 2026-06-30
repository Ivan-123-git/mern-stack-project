import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const MissingKeyFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
    <div className="max-w-md w-full glass p-8 rounded-2xl border border-rose-500/30 text-center animate-slide-in">
      <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
        <span className="text-2xl text-rose-400">🔑</span>
      </div>
      <h1 className="text-xl font-bold text-slate-200 mb-2">Clerk Publishable Key Missing</h1>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Please add your Clerk Publishable Key to <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300">client/.env</code> to enable authentication.
      </p>
      <div className="bg-slate-900/50 rounded-xl p-4 text-left border border-slate-800 text-xs font-mono select-all">
        VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
      </div>
    </div>
  </div>
);

const rootElement = document.getElementById('root');

if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'your_clerk_publishable_key_here') {
  createRoot(rootElement).render(
    <StrictMode>
      <MissingKeyFallback />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/login">
        <App />
      </ClerkProvider>
    </StrictMode>,
  );
}
