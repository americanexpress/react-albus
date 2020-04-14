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
import wizardShape from '../wizardShape';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: {
        id: null,
      },
      steps: [],
    };
    const { history: historyFromProps } = this.props;
    this.history = historyFromProps || createMemoryHistory();
    this.steps = [];
  }

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
    const { onNext } = this.props;
    this.unlisten = this.history.listen(({ pathname }) => {
      this.setState({ step: this.pathToStep(pathname) });
    });

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
    return steps.map(s => s.id);
  }

  get nextStep() {
    const { step } = this.state;
    return this.ids[this.ids.indexOf(step.id) + 1];
  }

  pathToStep = pathname => {
    const { exactMatch } = this.props;
    const { step: stepFromState, steps } = this.state;
    const id = pathname.replace(this.basename, '');
    const [step] = steps.filter(s => (exactMatch ? s.id === id : id.startsWith(s.id)));
    return step || stepFromState;
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
    const { onNext } = this.props;
    if (onNext) {
      onNext(this.getChildContext().wizard);
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
  exactMatch: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  render: PropTypes.func,
};

Wizard.defaultProps = {
  basename: '',
  history: null,
  onNext: null,
  render: null,
  exactMatch: true,
};

Wizard.childContextTypes = {
  wizard: wizardShape,
};

export default Wizard;
