'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  go: _propTypes2.default.func.isRequired,
  set: _propTypes2.default.func.isRequired,
  history: _propTypes2.default.object.isRequired,
  next: _propTypes2.default.func.isRequired,
  previous: _propTypes2.default.func.isRequired,
  push: _propTypes2.default.func.isRequired,
  replace: _propTypes2.default.func.isRequired,
  step: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired
  }).isRequired,
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired
  }).isRequired).isRequired
}); /*
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