/*
 * Copyright (c) 2017 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Wizard, Step, Steps, Navigation } from '../src';
import Merlin from './components/Merlin';
import Gandalf from './components/Gandalf';
import Dumbledore from './components/Dumbledore';
import Next from './navigation/Next';
import Previous from './navigation/Previous';

require('./animations/exampleAnimation.scss');

const Animated = () =>
  <Wizard
    render={({ step }) =>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <Steps key={step.path} step={step}>
          <Step path="merlin" className="example-step">
            <Merlin />
            <Navigation>
              <Next label="Continue" />
            </Navigation>
          </Step>
          <Step path="gandalf" className="example-step">
            <Gandalf />
            <Navigation
              render={({ next, previous }) =>
                <div>
                  <Previous previous={previous} label="Back" />
                  <Next next={next} label="Continue" />
                </div>}
            />
          </Step>
          <Step path="dumbledore" className="example-step">
            <Dumbledore />
            <Navigation>
              <Previous label="Back" />
            </Navigation>
          </Step>
        </Steps>
      </ReactCSSTransitionGroup>}
  />;

export default Animated;
