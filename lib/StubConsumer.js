'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddOn = require('./AddOn');

var _AddOn2 = _interopRequireDefault(_AddOn);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (stub) {
  return function (WrappedComponent) {
    var wrapper = function wrapper(props) {
      return _react2.default.createElement(
        _AddOn2.default,
        { stub: stub },
        _react2.default.createElement(WrappedComponent, props)
      );
    };

    wrapper.displayName = _constant.ADD_ON_HOC_DN;

    return wrapper;
  };
};