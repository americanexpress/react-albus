/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Simple from './examples/Simple';
import Routed from './examples/Routed';
import SkipStep from './examples/SkipStep';
import Progress from './examples/Progress';
import Animated from './examples/Animated';

const Index = () => (
  <ul>
    <li>
      <Link to="/simple">Simple</Link>
    </li>
    <li>
      <Link to="/routed">Routed</Link>
    </li>
    <li>
      <Link to="/skip-step">Skip Step</Link>
    </li>
    <li>
      <Link to="/progress-bar">Progress Bar</Link>
    </li>
    <li>
      <Link to="/animated">Animated</Link>
    </li>
  </ul>
);

render(
  <BrowserRouter>
    <div>
      <Route path="/" exact={true} component={Index} />
      <Route path="/simple" component={Simple} />
      <Route path="/routed" component={Routed} />
      <Route path="/skip-step" component={SkipStep} />
      <Route path="/progress-bar" component={Progress} />
      <Route path="/animated" component={Animated} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
