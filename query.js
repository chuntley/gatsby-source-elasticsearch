'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = query;
function query(options) {
  let result = {
    index: options.index,
    scroll: options.scrollDuration || '30s',
    size: options.scrollSize || 1000
  };

  if (typeof options.query === 'object') {
    return _extends({}, result, {
      body: {
        query: options.query
      }
    });
  }

  if (typeof options.query === 'string') {
    return _extends({}, result, {
      q: options.query
    });
  }

  return result;
}