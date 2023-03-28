'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var renderCallback = function renderCallback(_ref, wizard) {
  var render = _ref.render,
      children = _ref.children;

  if (render) {
    return render(wizard);
  } else if (typeof children === 'function') {
    return children(wizard);
  }
  return children;
};

exports.default = renderCallback;