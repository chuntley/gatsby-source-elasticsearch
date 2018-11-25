'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validation;
const isString = data => typeof data === 'string';

const isEmptyString = data => data === '';

const isObject = data => typeof data === 'object';

function validation(options) {
  if (options.typeName == null || !isString(options.typeName) || isEmptyString(options.typeName)) {
    console.log('Error: "typeName" option is required');
    return false;
  }

  if (options.connection == null || isString(options.connection) && isEmptyString(options.connection) && !isObject(options.connection)) {
    console.log('Error: "connection" option must either be a non-empty string or an object');
    return false;
  }

  if (options.index == null || !isString(options.index) || isEmptyString(options.index)) {
    console.log('Error: "index" option is required');
    return false;
  }

  if (options.query == null || !isString(options.query) && !isObject(options.query)) {
    console.log('Error: "query" must either be a string or an object');
    return false;
  }

  if (options.scrollDuration && !isString(options.scrollDuration)) {
    console.log('Error: "scrollDuration" must be a duration string (i.e. 1s, 10s, 1m)');
    return false;
  }

  if (options.scrollSize && isNaN(parseFloat(options.scrollSize)) && !isFinite(options.scrollSize)) {
    console.log('Error: "scrollSize" must be a number');
    return false;
  }

  return true;
}