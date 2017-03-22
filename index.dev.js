/* eslint-disable import/no-extraneous-dependencies, react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Simple from './examples/Simple';
import Routed from './examples/Routed';
import SkipStep from './examples/SkipStep';
import ProgressBar from './examples/ProgressBar';
import Animated from './examples/Animated';

const Index = () => <div>
  <Link to="/simple">simple example</Link><br />
  <Link to="/routed">routed example</Link><br />
  <Link to="/skip-step">skip step example</Link><br />
  <Link to="/progress-bar">progress bar example</Link><br />
  <Link to="/animated">animated example</Link><br />
</div>;

render(
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Index} />
      <Route path="/simple" component={Simple} />
      <Route path="/routed" component={Routed} />
      <Route path="/skip-step" component={SkipStep} />
      <Route path="/progress-bar" component={ProgressBar} />
      <Route path="/animated" component={Animated} />
    </div>
  </BrowserRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
