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
import { Wizard, Step, Steps, Navigation } from '../src';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import Next from './navigation/Next';
import Previous from './navigation/Previous';

const ProgressBar = () =>
  <Wizard
    render={({ step, steps }) =>
      <div>
        <div>
          {steps.map(s => s.path).indexOf(step.path) + 1}/{steps.length}
        </div>
        <Steps>
          <Step path="firstStep" name="First Step">
            <FirstStep />
            <Navigation>
              <Next label="Continue" />
            </Navigation>
          </Step>
          <Step path="secondStep" name="Second Step">
            <SecondStep />
            <Navigation
              render={({ next, previous }) =>
                <div>
                  <Previous previous={previous} label="Back" />
                  <Next next={next} label="Continue" />
                </div>}
            />
          </Step>
          <Step path="thirdStep" name="Third Step">
            <ThirdStep />
            <Navigation>
              <Previous label="Back" />
            </Navigation>
          </Step>
        </Steps>
      </div>}
  />;

export default ProgressBar;
