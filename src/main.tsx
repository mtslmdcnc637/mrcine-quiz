import { render } from 'preact';
import { Router, Route } from 'wouter-preact';
import QuizApp, { ErrorBoundary } from './QuizApp';
import GenreSelect from './game/GenreSelect';
import ActionGame from './game/ActionGame';
import HorrorGame from './game/HorrorGame';
import { captureReferral } from './lib/referral';
import './index.css';

captureReferral();

const shell = document.getElementById('app-shell');
if (shell) shell.remove();

render(
  <ErrorBoundary>
    <Router>
      <Route path="/" component={QuizApp} />
      <Route path="/game" component={GenreSelect} />
      <Route path="/game-action" component={ActionGame} />
      <Route path="/game-horror" component={HorrorGame} />
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')!,
);
