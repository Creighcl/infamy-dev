import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import HighScoreBoard from './HighScoreBoard';
import NewBoardButton from './new-board-button';
import HighScoreDisplay from './high-score-display';
import LookupBoardButton from './lookup-board-button';

function App() {
  return (
    <Router>
      {/* <header className="app-header">
        Infamy.dev
      </header> */}
      <div className="app-desktop-fill">
        <Switch>
          <Route path="/highscore/web">
            <HighScoreDisplay />
          </Route>
          <Route path="/highscore/:id">
            <HighScoreBoard />
          </Route>
          <Route path="/">
            <div className="desktop-panel desktop-left">
              <div className="site-title">
                  infamy.dev
              </div>
              <div className="description-box">
                <h4>Ready-Made-Scoreboards</h4>
                <ul>
                  <li>Click 'Create New Scoreboard'</li>
                  <li>Send web requests to infamy to add scores</li>
                  <li>Fetch scores in XML or JSON for display</li>
                </ul>
              </div>
            </div>
            <div className="desktop-panel desktop-right">
              <NewBoardButton />
              <LookupBoardButton />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
