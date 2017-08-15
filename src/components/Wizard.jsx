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
import { createMemoryHistory } from 'history';
import fixPath from '../utils';

class Wizard extends Component {
  state = {
    step: {
      path: null,
      name: null,
    },
  };

  getChildContext() {
    return {
      wizard: {
        step: this.state.step,
        steps: this.steps,
        next: this.next,
        previous: this.history.goBack,
        push: this.push,
        go: this.history.go,
        history: this.history,
      },
      wizardInit: this.init,
    };
  }

  componentWillMount() {
    this.unlisten = this.history.listen(({ pathname }) => {
      const path = pathname.split('/').pop();
      const step = this.steps.filter(s => s.path === path)[0];
      if (step) {
        this.setState({
          step,
        });
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  get paths() {
    return this.steps.map(s => s.path);
  }

  history = this.props.history || createMemoryHistory();
  steps = [];

  init = steps => {
    this.steps = steps;

    if (this.props.onNext) {
      this.props.onNext({ path: null, name: null }, this.steps, this.replace);
    } else {
      this.replace();
    }
  };

  push = step => {
    const nextStep = step || this.paths[this.paths.indexOf(this.state.step.path) + 1];
    this.history.push(fixPath(`${this.props.basename}/${nextStep}`));
  };

  replace = step => {
    const nextStep = step || this.paths[0];
    this.history.replace(fixPath(`${this.props.basename}/${nextStep}`));
  };

  next = () => {
    if (this.props.onNext) {
      this.props.onNext(this.state.step, this.steps, this.push);
    } else {
      this.push();
    }
  };

  render() {
    if (this.props.render) {
      return this.props.render(this.getChildContext().wizard);
    }
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

Wizard.propTypes = {
  basename: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  history: PropTypes.shape({
    entries: PropTypes.array,
    go: PropTypes.func,
    goBack: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  onNext: PropTypes.func,
  render: PropTypes.func,
};

Wizard.defaultProps = {
  basename: '',
  children: null,
  className: '',
  history: null,
  onNext: null,
  render: null,
};

Wizard.childContextTypes = {
  wizard: PropTypes.object,
  wizardInit: PropTypes.func,
};

export default Wizard;
