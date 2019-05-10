'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const isString = data => typeof data === 'string';

const isValidString = data => isString(data) && data.length > 0;

const isObject = data => typeof data === 'object';

const isDefined = data => typeof data !== 'undefined';

const validator = exports.validator = ({
  typeName,
  connection,
  index,
  query,
  body,
  scrollDuration,
  scrollSize
}) => {
  const errors = [];

  if (!isValidString(typeName)) {
    errors.push('Error: "typeName" option is required');
  }

  if (!connection || !(isValidString(connection) || isObject(connection))) {
    errors.push('Error: "connection" option must either be a non-empty string or an object');
  }

  if (!isValidString(index)) {
    errors.push('Error: "index" option is required');
  }

  if (isString(query) && isObject(query) || query === null && !isDefined(body)) {
    errors.push('Error: "query" must either be a string or an object');
  }

  if (isDefined(query) && isDefined(body)) {
    errors.push('Error: "query" and "body" are mutually exclusive');
  }

  if (!isDefined(query) && !isDefined(body)) {
    errors.push('Error: "query" or "body" is required');
  }

  if (isDefined(body) && !isObject(body) || body === null && !isDefined(query)) {
    errors.push('Error: "body" should be an object');
  }

  if (scrollDuration && !isValidString(scrollDuration)) {
    errors.push('Error: "scrollDuration" must be a duration string (i.e. 1s, 10s, 1m)');
  }

  if (scrollSize && !isFinite(scrollSize)) {
    errors.push('Error: "scrollSize" must be a number');
  }

  return errors;
};

const validation = exports.validation = options => {
  const errors = validator(options);

  if (errors.length) {
    errors.forEach(error => console.log(error));
    return false;
  }

  return true;
};

const isValid = exports.isValid = options => !validator(options).length;

exports.default = validation;