'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _history = require('history');

var _renderCallback = require('../utils/renderCallback');

var _renderCallback2 = _interopRequireDefault(_renderCallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

var Wizard = function (_Component) {
  _inherits(Wizard, _Component);

  function Wizard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Wizard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      step: {
        id: null
      },
      steps: []
    }, _this.history = _this.props.history || (0, _history.createMemoryHistory)(), _this.steps = [], _this.pathToStep = function (pathname) {
      var id = pathname.replace(_this.basename, '');

      var _this$state$steps$fil = _this.state.steps.filter(function (s) {
        return _this.props.exactMatch ? s.id === id : id.startsWith(s.id);
      }),
          _this$state$steps$fil2 = _slicedToArray(_this$state$steps$fil, 1),
          step = _this$state$steps$fil2[0];

      return step || _this.state.step;
    }, _this.init = function (steps) {
      _this.setState({ steps: steps }, function () {
        var step = _this.pathToStep(_this.history.location.pathname);
        if (step.id) {
          _this.setState({ step: step });
        } else {
          _this.history.replace('' + _this.basename + _this.ids[0]);
        }
      });
    }, _this.set = function (step) {
      return _this.history.push('' + _this.basename + step);
    }, _this.push = function () {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.nextStep;
      return _this.set(step);
    }, _this.replace = function () {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.nextStep;
      return _this.history.replace('' + _this.basename + step);
    }, _this.pushPrevious = function () {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.previousStep;
      return _this.set(step);
    }, _this.next = function () {
      if (_this.props.onNext) {
        _this.props.onNext(_this.getChildContext().wizard);
      } else {
        _this.push();
      }
    }, _this.previous = function () {
      _this.pushPrevious();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Wizard, [{
    key: 'getChildContext',
    value: function getChildContext() {
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
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.unlisten = this.history.listen(function (_ref2) {
        var pathname = _ref2.pathname;
        return _this2.setState({ step: _this2.pathToStep(pathname) });
      });

      if (this.props.onNext) {
        var _getChildContext$wiza = this.getChildContext().wizard,
            init = _getChildContext$wiza.init,
            wizard = _objectWithoutProperties(_getChildContext$wiza, ['init']);

        this.props.onNext(wizard);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unlisten();
    }
  }, {
    key: 'render',
    value: function render() {
      var _getChildContext$wiza2 = this.getChildContext().wizard,
          init = _getChildContext$wiza2.init,
          wizard = _objectWithoutProperties(_getChildContext$wiza2, ['init']);

      return (0, _renderCallback2.default)(this.props, wizard);
    }
  }, {
    key: 'basename',
    get: function get() {
      return this.props.basename + '/';
    }
  }, {
    key: 'ids',
    get: function get() {
      return this.state.steps.map(function (s) {
        return s.id;
      });
    }
  }, {
    key: 'nextStep',
    get: function get() {
      return this.ids[this.ids.indexOf(this.state.step.id) + 1];
    }
  }, {
    key: 'previousStep',
    get: function get() {
      return this.ids[this.ids.indexOf(this.state.step.id) - 1];
    }
  }]);

  return Wizard;
}(_react.Component);

Wizard.propTypes = {
  basename: _propTypes2.default.string,
  history: _propTypes2.default.shape({
    entries: _propTypes2.default.array,
    go: _propTypes2.default.func,
    goBack: _propTypes2.default.func,
    listen: _propTypes2.default.func,
    location: _propTypes2.default.object,
    push: _propTypes2.default.func,
    replace: _propTypes2.default.func
  }),
  onNext: _propTypes2.default.func,
  exactMatch: _propTypes2.default.bool
};

Wizard.defaultProps = {
  basename: '',
  history: null,
  onNext: null,
  render: null,
  exactMatch: true
};

Wizard.childContextTypes = {
  wizard: _propTypes2.default.object
};

exports.default = Wizard;