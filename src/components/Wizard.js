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
  state = {
    step: {
      id: null,
    },
    steps: [],
  };

  getChildContext() {
    return {
      wizard: {
        go: this.history.go,
        history: this.history,
        init: this.init,
        next: this.next,
        previous: this.history.goBack,
        push: this.push,
        replace: this.replace,
        ...this.state,
      },
    };
  }

  componentDidMount() {
    this.unlisten = this.history.listen(({ pathname }) =>
      this.setState({ step: this.pathToStep(pathname) })
    );

    if (this.props.onNext) {
      const { init, ...wizard } = this.getChildContext().wizard;
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

  history = this.props.history || createMemoryHistory();
  steps = [];

  pathToStep = pathname => {
    const id = pathname.replace(this.basename, '');
    const [step] = this.state.steps.filter(s => s.id === id);
    return step || this.state.step;
  };

  init = steps => {
    this.setState({ steps }, () => {
      const step = this.pathToStep(this.history.location.pathname);
      if (step.id) {
        this.setState({ step });
      } else {
        this.history.replace(`${this.basename}${this.ids[0]}`);
      }
    });
  };

  push = (step = this.nextStep) => this.history.push(`${this.basename}${step}`);
  replace = (step = this.nextStep) => this.history.replace(`${this.basename}${step}`);

  next = () => {
    if (this.props.onNext) {
      this.props.onNext(this.getChildContext().wizard);
    } else {
      this.push();
    }
  };

  render() {
    const { init, ...wizard } = this.getChildContext().wizard;
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
    replace: PropTypes.func,
  }),
  onNext: PropTypes.func,
};

Wizard.defaultProps = {
  basename: '',
  history: null,
  onNext: null,
  render: null,
};

Wizard.childContextTypes = {
  wizard: PropTypes.object,
};

export default Wizard;
