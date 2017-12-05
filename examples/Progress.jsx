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
import { Wizard, Step, Steps, WithWizard } from '../src';
import Merlin from './components/Merlin';
import Gandalf from './components/Gandalf';
import Dumbledore from './components/Dumbledore';
import Next from './navigation/Next';
import Previous from './navigation/Previous';

const Progress = () => (
  <Wizard>
    <ProgressBar />
    <Steps>
      <Step id="merlin" name="Merlin" location="Britain">
        <Merlin />
        <Next />
      </Step>
      <Step id="gandalf" name="Gandalf" location="Middle Earth">
        <Gandalf />
        <Previous />
        <Next />
      </Step>
      <Step id="dumbledore" name="Dumbledore" location="Hogwarts">
        <Dumbledore />
        <Previous />
      </Step>
    </Steps>
  </Wizard>
);

const ProgressBar = () => (
  <WithWizard
    render={({ step, steps }) => (
      <div>
        {steps.map(s => s.id).indexOf(step.id) + 1}/{steps.length} - {step.name} - {step.location}
      </div>
    )}
  />
);

export default Progress;
