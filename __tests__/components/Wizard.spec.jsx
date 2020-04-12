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
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Wizard, Steps, Step } from '../../src';

function setup(wizardProps) {
  const returnValue = {};

  act(() => {
    mount(
      <Wizard {...wizardProps}>
        {props => {
          Object.assign(returnValue, props);

          return (
            <Steps>
              <Step id="gryffindor">
                <div />
              </Step>
              <Step id="slytherin">
                <div />
              </Step>
            </Steps>
          );
        }}
      </Wizard>
    );
  });

  return returnValue;
}

describe('Wizard', () => {
  describe('with no props', () => {
    let wizard;

    beforeEach(() => {
      wizard = setup();
    });

    it('should go to the next and previous steps', () => {
      const { onNext, onPrevious } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      act(() => onNext());
      expect(wizard.step).toEqual({ id: 'slytherin' });
      act(() => onPrevious());
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    it('should push steps onto the stack', () => {
      const { push } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      act(() => push('slytherin'));
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    it('should replace steps in the stack', () => {
      const { replace } = wizard;
      act(() => replace());
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });

    it('should pull steps off the stack', () => {
      const { onNext, go } = wizard;
      expect(wizard.step).toEqual({ id: 'gryffindor' });
      act(() => onNext());
      expect(wizard.step).toEqual({ id: 'slytherin' });
      act(() => go(-1));
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });

    it('should do nothing if an invalid step is pushed', () => {
      const { push } = wizard;
      act(() => push('hufflepuff'));
      expect(wizard.step).toEqual({ id: 'gryffindor' });
    });
  });

  describe('with onNext prop', () => {
    const onWizardNext = jest.fn(({ push }) => push());

    let wizard;

    beforeEach(() => {
      wizard = setup({ onNext: onWizardNext });
    });

    it('call onNext and go to the next step', () => {
      const { onNext } = wizard;
      act(() => onNext());
      expect(onWizardNext).toHaveBeenCalled();
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });
  });

  describe('with existing history', () => {
    const history = {
      push: () => null,
      replace: () => null,
      listen: () => () => null,
      location: {
        pathname: '/slytherin',
      },
    };

    let wizard;

    beforeEach(() => {
      wizard = setup({ history });
    });

    it('starts at the step in history', () => {
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });
  });

  describe('with existing history and non-strict route matching', () => {
    const history = {
      push: () => null,
      replace: () => null,
      listen: () => () => null,
      location: {
        pathname: '/slytherin/snape',
      },
    };

    let wizard;

    beforeEach(() => {
      wizard = setup({ history, exactMatch: false });
    });

    it('matches the step', () => {
      expect(wizard.step).toEqual({ id: 'slytherin' });
    });
  });

  describe('without a function as a child', () => {
    let mounted;

    beforeEach(() => {
      act(() => {
        mounted = mount(
          <Wizard>
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
    });

    it('should render the snapshot correctly', () => {
      expect(mounted).toMatchSnapshot();
    });
  });
});
