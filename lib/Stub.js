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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stub = function (_React$Component) {
  _inherits(Stub, _React$Component);

  function Stub(props, context) {
    _classCallCheck(this, Stub);

    var _this = _possibleConstructorReturn(this, (Stub.__proto__ || Object.getPrototypeOf(Stub)).call(this, props, context));

    _this.addOnRenderer = context.requestAddOnRenderer(props.name);
    return _this;
  }

  _createClass(Stub, [{
    key: 'render',
    value: function render() {
      return this.addOnRenderer && this.addOnRenderer() || this.props.children || null;
    }
  }]);

  return Stub;
}(_react2.default.Component);

Stub.contextTypes = {
  requestAddOnRenderer: _propTypes2.default.func
};
Stub.propTypes = {
  name: _propTypes2.default.string
};
Stub.defaultProps = {
  name: _constant.DEFAULT_STUB_NAME
};
exports.default = Stub;