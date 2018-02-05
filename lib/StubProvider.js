'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDisplayName(component) {
  return component.displayName || component.name || 'component';
}

exports.default = function (WrappedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_React$Component) {
    _inherits(StubWrapper, _React$Component);

    function StubWrapper() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, StubWrapper);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StubWrapper.__proto__ || Object.getPrototypeOf(StubWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.addOnRenderers = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(StubWrapper, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          requestAddOnRenderer: this.addOnRendererRegister.bind(this)
        };
      }
    }, {
      key: 'addOnRendererRegister',
      value: function addOnRendererRegister(name) {
        var _this2 = this;

        return function () {
          return _this2.addOnRenderers[name];
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props = this.props,
            children = _props.children,
            restProps = _objectWithoutProperties(_props, ['children']);

        if (children) {
          var arr = _react2.default.Children.toArray(children);
          var nameChecked = [];
          this.addOnRenderers = {};
          arr.forEach(function (item) {
            var itemType = item.type;
            if (itemType.displayName === _constant.ADD_ON_HOC_DN) {
              item = itemType(children.props);
            }
            if (item.type.displayName === _constant.ADD_ON_DN) {
              var stubName = item.props.stub || _constant.DEFAULT_STUB_NAME;
              // checking, ensure the uniqueness of the consumer
              if (nameChecked.findIndex(function (item) {
                return item === stubName;
              }) !== -1) {
                throw new Error('Stub(' + stubName + ') has been occupied');
              }

              _this3.addOnRenderers[stubName] = item.props.children;
              // cache for next checking
              nameChecked.push(stubName);
            }
          });
        }
        return _react2.default.createElement(WrappedComponent, restProps);
      }
    }]);

    return StubWrapper;
  }(_react2.default.Component), _class.displayName = 'StubProvider(' + getDisplayName(WrappedComponent) + ')', _class.childContextTypes = {
    requestAddOnRenderer: _propTypes2.default.func
  }, _temp2;
};