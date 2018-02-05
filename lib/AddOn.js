'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddOn = function AddOn() {
  return null;
};

AddOn.propTypes = { name: _propTypes2.default.string };
AddOn.defaultTypes = { name: _constant.DEFAULT_STUB_NAME };
AddOn.displayName = _constant.ADD_ON_DN;

exports.default = AddOn;