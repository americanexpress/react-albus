'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _renderCallback = require('../utils/renderCallback');

var _renderCallback2 = _interopRequireDefault(_renderCallback);

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

var createWizardComponent = function createWizardComponent(name) {
  var WizardComponent = function WizardComponent(props, _ref) {
    var _ref$wizard = _ref.wizard,
        init = _ref$wizard.init,
        wizard = _objectWithoutProperties(_ref$wizard, ['init']);

    return (0, _renderCallback2.default)(props, wizard);
  };

  WizardComponent.contextTypes = {
    wizard: _propTypes2.default.object
  };

  WizardComponent.displayName = name;

  return WizardComponent;
};

exports.default = createWizardComponent;