var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
import hoistStatics from 'hoist-non-react-statics';

const withWizard = Component => {
  const WithWizard = (props, _ref) => {
    let { wizard: { init } } = _ref,
        wizard = _objectWithoutProperties(_ref.wizard, ['init']);

    return React.createElement(Component, _extends({
      wizard
    }, props));
  };

  WithWizard.contextTypes = {
    wizard: PropTypes.object
  };

  WithWizard.displayName = `withWizard(${Component.displayName || Component.name})`;
  WithWizard.WrappedComponent = Component;

  return hoistStatics(WithWizard, Component);
};

export default withWizard;