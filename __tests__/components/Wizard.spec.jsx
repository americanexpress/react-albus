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
import { mount } from 'enzyme';

import { Wizard, Steps, Step, WithWizard } from '../../src';

describe('Wizard', () => {
  describe('with no props', () => {
    let wizard;
    let mounted;
    beforeEach(() => {
      mounted = mount(
        <Wizard>
          <WithWizard>
            {prop => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Wizard>
      );
    });

    it('should go to the next and previous steps', () => {
      const { next, previous } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      next();
      expect(wizard.step).toEqual({ id: 'slytherin' });
      previous();
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    it('should push steps onto the stack', () => {
      const { push } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      push('slytherin');
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    it('should replace steps in the stack', () => {
      const { replace } = wizard;
      replace();
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    it('should pull steps off the stack', () => {
      const { next, go } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      next();
      expect(wizard.step).toEqual({ id: 'slytherin' });
      go(-1);
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    it('should do nothing if an invalid step is pushed', () => {
      const { push } = wizard;
      push('hufflepuff');
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    afterEach(() => {
      mounted.unmount();
    });
  });

  describe('with onNext prop', () => {
    const onNext = jest.fn(({ push }) => push());

    let wizard;
    let mounted;
    beforeEach(() => {
      mounted = mount(
        <Wizard onNext={onNext}>
          <WithWizard>
            {prop => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Wizard>
      );
    });

    it('call onNext and go to the next step', () => {
      const { next } = wizard;
      next();
      expect(onNext).toHaveBeenCalled();
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    afterEach(() => {
      mounted.unmount();
    });
  });

  describe('with existing history', () => {
    const history = {
      replace: () => null,
      listen: () => () => null,
      location: {
        pathname: '/slytherin',
      },
    };

    let wizard;
    let mounted;
    beforeEach(() => {
      mounted = mount(
        <Wizard history={history}>
          <WithWizard>
            {prop => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            <Step id="gryffindor">
              <div />
            </Step>
            <Step id="slytherin">
              <div />
            </Step>
          </Steps>
        </Wizard>
      );
    });

    it('starts at the step in history', () => {
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    afterEach(() => {
      mounted.unmount();
    });
  });
});
