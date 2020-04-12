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
import { WithWizard } from '../../src';

const mockWizard = { drinkMore: 'butter beer' };

jest.mock('../../src/hooks/useWizard', () => jest.fn(() => mockWizard));

describe('WithWizard', () => {
  it('should render children', () => {
    const rendered = shallow(
      <WithWizard>
        <div />
      </WithWizard>
    );

    expect(rendered).toMatchSnapshot();
  });

  it('should pass wizard to function as child', () => {
    shallow(
      <WithWizard>
        {wizard => {
          expect(wizard).toEqual(mockWizard);
        }}
      </WithWizard>
    );
  });

  it('should pass wizard to render prop', () => {
    shallow(
      <WithWizard
        render={wizard => {
          expect(wizard).toEqual(mockWizard);
        }}
      />
    );
  });
});
