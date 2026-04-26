import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import QuizApp from './QuizApp';
import { captureReferral } from './lib/referral';
import './index.css';

// Capture referral code from URL on load
captureReferral();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-center" richColors />
    <QuizApp />
  </React.StrictMode>,
);
