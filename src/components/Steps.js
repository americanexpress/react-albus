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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import wizardShape from '../wizardShape';

class Steps extends Component {
  componentDidMount() {
    const { children: ownChildren } = this.props;
    const { wizard } = this.context;
    const steps = React.Children.map(
      ownChildren,
      ({ props: { children, render, ...config } }) => config
    );
    wizard.init(steps);
  }

  render() {
    const { step, children } = this.props;
    const { wizard } = this.context;
    const { id: activeId } = step || wizard.step;
    const [child = null] = React.Children.toArray(children).filter(
      ({ props: { id } }) => id === activeId
    );
    return child;
  }
}

Steps.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

Steps.defaultProps = {
  step: null,
};

Steps.contextTypes = {
  wizard: wizardShape,
};

export default Steps;
