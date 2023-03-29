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

import { Component } from 'react';
import PropTypes from 'prop-types';
import { createMemoryHistory } from 'history';
import renderCallback from '../utils/renderCallback';

class Wizard extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      step: {
        id: null
      },
      steps: []
    }, this.history = this.props.history || createMemoryHistory(), this.steps = [], this.pathToStep = pathname => {
      const id = pathname.replace(this.basename, '');
      const [step] = this.state.steps.filter(s => this.props.exactMatch ? s.id === id : id.startsWith(s.id));

      return step || this.state.step;
    }, this.init = steps => {
      this.setState({ steps }, () => {
        const step = this.pathToStep(this.history.location.pathname);
        if (step.id) {
          this.setState({ step });
        } else {
          this.history.replace(`${this.basename}${this.ids[0]}`);
        }
      });
    }, this.set = step => this.history.push(`${this.basename}${step}`), this.push = (step = this.nextStep) => this.set(step), this.replace = (step = this.nextStep) => this.history.replace(`${this.basename}${step}`), this.pushPrevious = (step = this.previousStep) => this.set(step), this.next = () => {
      if (this.props.onNext) {
        this.props.onNext(this.getChildContext().wizard);
      } else {
        this.push();
      }
    }, this.previous = () => {
      this.pushPrevious();
    }, _temp;
  }

  getChildContext() {
    return {
      wizard: _extends({
        go: this.history.go,
        set: this.set,
        history: this.history,
        init: this.init,
        next: this.next,
        previous: this.previous,
        push: this.push,
        replace: this.replace
      }, this.state)
    };
  }

  componentDidMount() {
    this.unlisten = this.history.listen(({ pathname }) => this.setState({ step: this.pathToStep(pathname) }));

    if (this.props.onNext) {
      const _getChildContext$wiza = this.getChildContext().wizard,
            { init } = _getChildContext$wiza,
            wizard = _objectWithoutProperties(_getChildContext$wiza, ['init']);
      this.props.onNext(wizard);
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  get basename() {
    return `${this.props.basename}/`;
  }

  get ids() {
    return this.state.steps.map(s => s.id);
  }

  get nextStep() {
    return this.ids[this.ids.indexOf(this.state.step.id) + 1];
  }

  get previousStep() {
    return this.ids[this.ids.indexOf(this.state.step.id) - 1];
  }

  render() {
    const _getChildContext$wiza2 = this.getChildContext().wizard,
          { init } = _getChildContext$wiza2,
          wizard = _objectWithoutProperties(_getChildContext$wiza2, ['init']);
    return renderCallback(this.props, wizard);
  }
}

Wizard.propTypes = {
  basename: PropTypes.string,
  history: PropTypes.shape({
    entries: PropTypes.array,
    go: PropTypes.func,
    goBack: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  onNext: PropTypes.func,
  exactMatch: PropTypes.bool
};

Wizard.defaultProps = {
  basename: '',
  history: null,
  onNext: null,
  render: null,
  exactMatch: true
};

Wizard.childContextTypes = {
  wizard: PropTypes.object
};

export default Wizard;