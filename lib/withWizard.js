'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
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

var withWizard = function withWizard(Component) {
  var WithWizard = function WithWizard(props, _ref) {
    var _ref$wizard = _ref.wizard,
        init = _ref$wizard.init,
        wizard = _objectWithoutProperties(_ref$wizard, ['init']);

    return _react2.default.createElement(Component, _extends({
      wizard: wizard
    }, props));
  };

  WithWizard.contextTypes = {
    wizard: _propTypes2.default.object
  };

  WithWizard.displayName = 'withWizard(' + (Component.displayName || Component.name) + ')';
  WithWizard.WrappedComponent = Component;

  return (0, _hoistNonReactStatics2.default)(WithWizard, Component);
};

exports.default = withWizard;