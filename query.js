'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const isString = data => typeof data === 'string';

const isObject = data => typeof data === 'object';

exports.default = ({ index, scrollDuration, scrollSize, query, body }) => {
  const result = {
    index,
    scroll: scrollDuration || '30s',
    size: scrollSize || 1000
  };

  if (isObject(body)) {
    return _extends({}, result, {
      body: body
    });
  }

  if (isObject(query)) {
    return _extends({}, result, {
      body: {
        query
      }
    });
  }

  if (isString(query)) {
    return _extends({}, result, {
      q: query
    });
  }

  return result;
};