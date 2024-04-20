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
  constructor(props) {
    super(props);
    this.state = {
      step: {
        id: null,
      },
      steps: [],
    };
  }

  getChildContext() {
    return {
      wizard: {
        go: this.history.go,
        set: this.set,
        history: this.history,
        init: this.init,
        next: this.next,
        previous: this.previous,
        push: this.push,
        replace: this.replace,
        ...this.state,
      },
    };
  }

  componentDidMount() {
    this.unlisten = this.history.listen(
      ({ pathname }) => this.setState({ step: this.pathToStep(pathname) })
    );
    const { onNext } = this.props;
    if (onNext) {
      const { init, ...wizard } = this.getChildContext().wizard;
      onNext(wizard);
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  get basename() {
    const { basename } = this.props;
    return `${basename}/`;
  }

  get ids() {
    const { steps } = this.state;
    return steps?.map((s) => s.id);
  }

  get nextStep() {
    // eslint-disable-next-line react/destructuring-assignment -- TBD
    return this.ids[this.ids.indexOf(this.state.step.id) + 1];
  }

  get previousStep() {
    // eslint-disable-next-line react/destructuring-assignment -- TBD
    return this.ids[this.ids.indexOf(this.state.step.id) - 1];
  }

  // eslint-disable-next-line react/sort-comp, react/destructuring-assignment -- Naming conflict
  history = this.props?.history || createMemoryHistory();

  // eslint-disable-next-line react/no-unused-class-component-methods -- TBD
  steps = [];

  pathToStep = (pathname) => {
    const { exactMatch } = this.props;
    const { steps } = this.state;
    const id = pathname.replace(this.basename, '');
    const [step] = steps.filter(
      (s) => (exactMatch ? s.id === id : id.startsWith(s.id))
    );
    // eslint-disable-next-line react/destructuring-assignment -- Naming conflict
    return step || this.state.step;
  };

  init = (steps) => {
    this.setState({ steps }, () => {
      const step = this.pathToStep(this.history.location.pathname);
      if (step.id) {
        this.setState({ step });
      } else {
        this.history.replace(`${this.basename}${this.ids[0]}`);
      }
    });
  };

  set = (step) => this.history?.push(`${this.basename}${step}`);

  push = (step = this.nextStep) => this.set(step);

  replace = (step = this.nextStep) => this.history.replace(`${this.basename}${step}`);

  pushPrevious = (step = this.previousStep) => this.set(step);

  next = () => {
    const { onNext } = this.props;
    if (onNext) {
      onNext(this.getChildContext().wizard);
    } else {
      this.push();
    }
  };

  previous = () => {
    this.pushPrevious();
  };

  render() {
    const { init, ...wizard } = this.getChildContext().wizard;
    return renderCallback(this.props, wizard);
  }
}

Wizard.propTypes = {
  basename: PropTypes.string,
  history: PropTypes.shape({
    entries: PropTypes.shape([]),
    go: PropTypes.func,
    goBack: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.shape({}),
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  onNext: PropTypes.func,
  // eslint-disable-next-line react/boolean-prop-naming -- TBD
  exactMatch: PropTypes.bool,
  // steps: PropTypes.shape([]),
};

Wizard.defaultProps = {
  basename: '',
  history: null,
  onNext: null,
  exactMatch: true,
};

Wizard.childContextTypes = {
  wizard: PropTypes.shape({}),
};

export default Wizard;
