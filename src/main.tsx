import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import QuizApp from './QuizApp';
import { captureReferral } from './lib/referral';
import './index.css';

// Capture referral on idle to not block render
if ('requestIdleCallback' in window) {
  requestIdleCallback(captureReferral);
} else {
  setTimeout(captureReferral, 1);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" richColors />
    <QuizApp />
  </>,
);
