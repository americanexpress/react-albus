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

const Step = () => null;

const context = {
  wizard: {
    step: {
      id: null,
    },
    steps: [],
    init: jest.fn(),
  },
};

describe('Steps', () => {
  it('should call init', () => {
    shallow(
      <Steps>
        <Step id="hogwarts" />
      </Steps>,
      { context },
    );

    expect(context.wizard.init).toHaveBeenCalledWith([{ id: 'hogwarts' }]);
  });

  it('should render correct child if controlled', () => {
    const rendered = shallow(
      <Steps step={{ id: 'hogwarts' }}>
        <Step id="hogwarts" />
        <Step id="gryffindor" />
      </Steps>,
      { context },
    );

    expect(rendered).toMatchSnapshot();
  });
});
