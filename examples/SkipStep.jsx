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
import { Wizard, Step, Steps } from '../src';
import Merlin from './components/Merlin';
import Gandalf from './components/Gandalf';
import Dumbledore from './components/Dumbledore';
import Next from './navigation/Next';
import Previous from './navigation/Previous';

const SkipStep = () => {
  const skip = ({ step, push }) => {
    switch (step.id) {
      case 'merlin': {
        push('dumbledore');
        break;
      }
      default:
        push();
    }
  };

  return (
    <Wizard onNext={skip}>
      <Steps>
        <Step id="merlin">
          <Merlin />
          <Next />
        </Step>
        <Step id="gandalf">
          <Gandalf />
        </Step>
        <Step id="dumbledore">
          <Dumbledore />
          <Previous />
        </Step>
      </Steps>
    </Wizard>
  );
};

export default SkipStep;
