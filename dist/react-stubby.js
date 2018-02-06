(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
	(factory((global.ReactStubby = {}),global.React,global.PropTypes));
}(this, (function (exports,React,PropTypes) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

var DEFAULT_STUB_NAME = '$$default';

var ADD_ON_DN = 'Stub.AddOn';

var ADD_ON_HOC_DN = 'StubConsumer(' + ADD_ON_DN + ')';

var AddOn = function AddOn() {
  return null;
};

AddOn.propTypes = { name: PropTypes.string };
AddOn.defaultTypes = { name: DEFAULT_STUB_NAME };
AddOn.displayName = ADD_ON_DN;

var _StubConsumer = (function (stub) {
  return function (WrappedComponent) {
    var wrapper = function wrapper(props) {
      return React.createElement(
        AddOn,
        { stub: stub },
        React.createElement(WrappedComponent, props)
      );
    };

    wrapper.displayName = ADD_ON_HOC_DN;

    return wrapper;
  };
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function getDisplayName(component) {
  return component.displayName || component.name || 'component';
}

var _StubProvider = (function (WrappedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_React$Component) {
    inherits(StubWrapper, _React$Component);

    function StubWrapper() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, StubWrapper);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = StubWrapper.__proto__ || Object.getPrototypeOf(StubWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.addOnRenderers = {}, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(StubWrapper, [{
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
            restProps = objectWithoutProperties(_props, ['children']);


        if (children) {
          var arr = React.Children.toArray(children);
          var nameChecked = [];
          this.addOnRenderers = {};
          arr.forEach(function (item) {
            var itemType = item.type;
            if (itemType.displayName === ADD_ON_HOC_DN) {
              item = itemType(children.props);
            }
            if (item.type.displayName === ADD_ON_DN) {
              var stubName = item.props.stub || DEFAULT_STUB_NAME;
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
        return React.createElement(WrappedComponent, restProps);
      }
    }]);
    return StubWrapper;
  }(React.Component), _class.displayName = 'StubProvider(' + getDisplayName(WrappedComponent) + ')', _class.childContextTypes = {
    requestAddOnRenderer: PropTypes.func
  }, _temp2;
});

var StubContextProvider = function (_React$Component) {
  inherits(StubContextProvider, _React$Component);

  function StubContextProvider() {
    classCallCheck(this, StubContextProvider);
    return possibleConstructorReturn(this, (StubContextProvider.__proto__ || Object.getPrototypeOf(StubContextProvider)).apply(this, arguments));
  }

  createClass(StubContextProvider, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.Wrapped = null;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.Wrapped = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.Wrapped) {
        this.Wrapped = _StubProvider(function () {
          return React.Children.only(_this2.props.children);
        });
      }
      return React.createElement(this.Wrapped, null);
    }
  }]);
  return StubContextProvider;
}(React.Component);

var Stub = function (_React$Component) {
  inherits(Stub, _React$Component);

  function Stub(props, context) {
    classCallCheck(this, Stub);

    var _this = possibleConstructorReturn(this, (Stub.__proto__ || Object.getPrototypeOf(Stub)).call(this, props, context));

    _this.addOnRenderer = context.requestAddOnRenderer(props.name);
    return _this;
  }

  createClass(Stub, [{
    key: 'render',
    value: function render() {
      return this.addOnRenderer && this.addOnRenderer() || this.props.children || null;
    }
  }]);
  return Stub;
}(React.Component);

Stub.contextTypes = {
  requestAddOnRenderer: PropTypes.func
};
Stub.propTypes = {
  name: PropTypes.string
};
Stub.defaultProps = {
  name: DEFAULT_STUB_NAME
};

var StubConsumer = _StubConsumer;

var StubProvider = _StubProvider;

var StubContextProvider$1 = StubContextProvider;

Stub.AddOn = AddOn;

var Stub$1 = Stub;

exports.StubConsumer = StubConsumer;
exports.StubProvider = StubProvider;
exports.StubContextProvider = StubContextProvider$1;
exports.Stub = Stub$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-stubby.js.map
