'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var Steps = function (_Component) {
  _inherits(Steps, _Component);

  function Steps() {
    _classCallCheck(this, Steps);

    return _possibleConstructorReturn(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
  }

  _createClass(Steps, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var steps = _react2.default.Children.map(this.props.children, function (_ref) {
        var _ref$props = _ref.props,
            children = _ref$props.children,
            render = _ref$props.render,
            config = _objectWithoutProperties(_ref$props, ['children', 'render']);

        return config;
      });
      this.context.wizard.init(steps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref2 = this.props.step || this.context.wizard.step,
          activeId = _ref2.id;

      var _React$Children$toArr = _react2.default.Children.toArray(this.props.children).filter(function (_ref3) {
        var id = _ref3.props.id;
        return id === activeId;
      }),
          _React$Children$toArr2 = _slicedToArray(_React$Children$toArr, 1),
          _React$Children$toArr3 = _React$Children$toArr2[0],
          child = _React$Children$toArr3 === undefined ? null : _React$Children$toArr3;

      return child;
    }
  }]);

  return Steps;
}(_react.Component);

Steps.propTypes = {
  children: _propTypes2.default.node.isRequired,
  step: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired
  })
};

Steps.defaultProps = {
  step: null
};

Steps.contextTypes = {
  wizard: _propTypes2.default.object
};

exports.default = Steps;