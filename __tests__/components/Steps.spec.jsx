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
import { shallow } from 'enzyme';

import { Steps } from '../../src';

const FakeStep = () => <div />;

describe('Steps', () => {
  it('should call _setSteps', () => {
    const context = {
      wizard: {
        _setSteps: jest.fn(),
        steps: [],
      },
    };

    shallow(
      <Steps>
        <FakeStep path="hogwarts" />
      </Steps>,
      { context },
    );
    // eslint-disable-next-line no-underscore-dangle
    expect(context.wizard._setSteps).toHaveBeenCalled();
  });

  it('should not call _setSteps if wizard already has steps', () => {
    const context = {
      wizard: {
        _setSteps: jest.fn(),
        steps: [
          'we',
          'have',
          'steps',
        ],
      },
    };

    shallow(
      <Steps>
        <FakeStep path="hogwarts" />
      </Steps>,
      { context },
    );
    // eslint-disable-next-line no-underscore-dangle
    expect(context.wizard._setSteps).not.toHaveBeenCalled();
  });

  it('should render correct child if controlled', () => {
    const context = {};

    const mounted = shallow(
      <Steps step={{ path: 'hogwarts', step: 'hogwarts' }}>
        <FakeStep path="hogwarts" />
        <FakeStep path="gryffindor" />
      </Steps>,
      { context },
    );

    expect(mounted).toMatchSnapshot();
  });
});
