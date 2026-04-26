import { render } from 'preact';
import QuizApp from './QuizApp';
import { captureReferral } from './lib/referral';
import './index.css';

// Capture referral on idle to not block render
if ('requestIdleCallback' in window) {
  requestIdleCallback(captureReferral);
} else {
  setTimeout(captureReferral, 1);
}

// Remove static HTML shell after Preact mounts
const shell = document.getElementById('app-shell');
if (shell) shell.remove();

render(<QuizApp />, document.getElementById('root')!);
