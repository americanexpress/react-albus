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
import hoistStatics from 'hoist-non-react-statics';
import useWizard from './hooks/useWizard';

import wizardShape from './wizardShape';

const withWizard = Component => {
  const WithWizard = props => {
    const wizard = useWizard();

    return <Component wizard={wizard} {...props} />;
  };

  WithWizard.contextTypes = {
    wizard: wizardShape,
  };

  WithWizard.displayName = `withWizard(${Component.displayName || Component.name})`;
  WithWizard.WrappedComponent = Component;

  return hoistStatics(WithWizard, Component);
};

export default withWizard;
