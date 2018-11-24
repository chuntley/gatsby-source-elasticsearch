'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validation;
const isString = data => typeof data === 'string';

const isValidString = data => isString(data) && data.length > 0;

const isObject = data => typeof data === 'object';

function validation({
  typeName,
  connection,
  index,
  query,
  scrollDuration,
  scrollSize
}) {
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

  if (query === null || !(isString(query) || isObject(query))) {
    errors.push('Error: "query" must either be a string or an object');
  }

  if (scrollDuration && !isValidString(scrollDuration)) {
    errors.push('Error: "scrollDuration" must be a duration string (i.e. 1s, 10s, 1m)');
  }

  if (scrollSize && !isFinite(scrollSize)) {
    errors.push('Error: "scrollSize" must be a number');
  }

  if (errors.length) {
    errors.forEach(error => console.log(error));
    return false;
  }

  return true;
}