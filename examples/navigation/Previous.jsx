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

import React, { PropTypes } from 'react';

const Previous = ({ className, disabled, label, previous }) =>
  <button className={className} onClick={previous} disabled={disabled}>{label}</button>;

Previous.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  previous: PropTypes.func,
};

Previous.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  previous: null,
};

export default Previous;
