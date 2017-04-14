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
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { Wizard } from '../../src';

const ExposeWizard = ({ children }, context) => children(context);
ExposeWizard.contextTypes = {
  wizard: PropTypes.object,
  wizardInit: PropTypes.func,
};

describe('Wizard', () => {
  let mounted;
  let init;
  let step;
  let next;
  let previous;
  let push;
  let go;

  describe('with render prop', () => {
    beforeEach(() => {
      const history = {
        replace: () => null,
        listen: () => () => null,
      };

      mounted = mount(
        <Wizard history={history} render={() => null} />,
      );
    });

    it('should render', () => {
      expect(mounted).toMatchSnapshot();
    });

    afterEach(() => {
      mounted.unmount();
    });
  });

  describe('with no other props', () => {
    beforeEach(() => {
      mounted = mount(
        <Wizard>
          <ExposeWizard>
            {({
              wizard: {
                step: wizardStep,
                next: wizardNext,
                previous: wizardPrevious,
                push: wizardPush,
                go: wizardGo,
              },
              wizardInit,
            }) => {
              step = wizardStep;
              next = wizardNext;
              previous = wizardPrevious;
              push = wizardPush;
              go = wizardGo;
              init = wizardInit;
              return null;
            }}
          </ExposeWizard>
        </Wizard>,
      );

      init([
        { path: 'gryffindor' },
        { path: 'slytherin' },
      ]);
    });

    it('should go to the next and previous steps', () => {
      expect(step).toEqual({ path: 'gryffindor' });
      next();
      expect(step).toEqual({ path: 'slytherin' });
      previous();
      expect(step).toEqual({ path: 'gryffindor' });
    });

    it('should push steps onto the stack', () => {
      expect(step).toEqual({ path: 'gryffindor' });
      push('slytherin');
      expect(step).toEqual({ path: 'slytherin' });
    });

    it('should pull steps off the stack', () => {
      expect(step).toEqual({ path: 'gryffindor' });
      next();
      expect(step).toEqual({ path: 'slytherin' });
      go(-1);
      expect(step).toEqual({ path: 'gryffindor' });
    });

    it('should do nothing if an invalid step is pushed', () => {
      push('hufflepuff');
      expect(step).toEqual({ path: 'gryffindor' });
    });

    it('should unlisten on unmount', () => {
      mounted.unmount();
      push('slytherin');
      expect(step.path).toEqual('gryffindor');
    });

    afterEach(() => {
      mounted.unmount();
    });
  });

  describe('with onNext prop', () => {
    const onNext = jest.fn((onNextStep, onNextSteps, onNextPush) => onNextPush());

    beforeEach(() => {
      mounted = mount(
        <Wizard onNext={onNext}>
          <ExposeWizard>
            {({
              wizard: {
                next: wizardNext,
              },
              wizardInit,
            }) => {
              next = wizardNext;
              init = wizardInit;
              return null;
            }}
          </ExposeWizard>
        </Wizard>,
      );

      init([
        { path: 'gryffindor' },
        { path: 'slytherin' },
      ]);
    });

    it('should go to the next step and call onNext', () => {
      next();
      expect(onNext).toHaveBeenCalled();
    });

    afterEach(() => {
      mounted.unmount();
    });
  });
});
