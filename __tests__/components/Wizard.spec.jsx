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
import { createMemoryHistory } from 'history';

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

  describe('with canNavigateTo prop', () => {
    let wizard;
    let mounted;

    const canNavigate = jest.fn().mockReturnValue(true);
    const cannotNavigate = jest.fn().mockReturnValue(false);

    const getMounted = ({ steps, ...wizardProps }) =>
      mount(
        <Wizard {...wizardProps}>
          <WithWizard>
            {prop => {
              wizard = prop;
              return null;
            }}
          </WithWizard>
          <Steps>
            {steps.map(step => (
              <Step id={step.id} key={step.id} canNavigateTo={step.canNavigateTo}>
                <div />
              </Step>
            ))}
          </Steps>
        </Wizard>
      );

    describe('when canNavigateTo returns `true`', () => {
      beforeEach(() => {
        canNavigate.mockClear();
        cannotNavigate.mockClear();
        const steps = [
          { id: 'gryffindor', canNavigateTo: canNavigate },
          { id: 'slytherin', canNavigateTo: canNavigate },
          { id: 'gandalf', canNavigateTo: canNavigate },
          { id: 'yoda', canNavigateTo: canNavigate },
        ];
        mounted = getMounted({ steps });
      });
      it('call next and go to the next step', () => {
        const { next } = wizard;

        next();
        expect(canNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('slytherin');
      });
    });

    describe('when canNavigateTo returns `false`', () => {
      beforeEach(() => {
        canNavigate.mockClear();
        cannotNavigate.mockClear();
        const steps = [
          { id: 'gryffindor', canNavigateTo: cannotNavigate },
          { id: 'slytherin', canNavigateTo: cannotNavigate },
          { id: 'gandalf', canNavigateTo: cannotNavigate },
          { id: 'yoda', canNavigateTo: cannotNavigate },
        ];
        mounted = getMounted({ steps });
      });
      it("call next and don't go to the next step", () => {
        const { next } = wizard;

        next();
        expect(cannotNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('gryffindor');
      });
    });

    describe('with history (hotlinking a wizard step)', () => {
      const steps = [
        { id: 'gryffindor', canNavigateTo: canNavigate },
        { id: 'slytherin', canNavigateTo: canNavigate },
        { id: 'gandalf', canNavigateTo: cannotNavigate },
        { id: 'yoda', canNavigateTo: cannotNavigate },
      ];

      beforeEach(() => {
        canNavigate.mockClear();
        cannotNavigate.mockClear();
        const history = createMemoryHistory();
        mounted = getMounted({ steps, history });
      });

      it('should be able to navigate to gryffindor', () => {
        const { replace } = wizard;

        replace('gryffindor');
        expect(canNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('gryffindor');
      });
      it('should be able to navigate to slytherin', () => {
        const { replace } = wizard;

        replace('slytherin');
        expect(canNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('slytherin');
      });
      it('should not be able to navigate to gandalf', () => {
        const { push, replace } = wizard;

        push('slytherin');
        replace('gandalf');
        expect(cannotNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('slytherin');
      });
      it('should not be able to navigate to yoda', () => {
        const { replace } = wizard;

        replace('yoda');
        expect(cannotNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('gryffindor');
      });

      it('should not be able to navigate to gandalf via slytherin', () => {
        const { push } = wizard;

        push('slytherin');
        push('gandalf');
        expect(cannotNavigate).toHaveBeenCalled();
        expect(wizard.step.id).toEqual('slytherin');
      });
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
