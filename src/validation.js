export default function validation(options) {
  if (options.typeName == null
    || (typeof options.typeName !== 'string' || options.typeName === '')) {
    console.log('Error: "typeName" option is required');
    return false;
  }

  if (options.connection == null
    || ((typeof options.connection === 'string' && options.connection === '') && typeof options.connection !== 'object')) {
    console.log('Error: "connection" option must either be a non-empty string or an object');
    return false;
  }

  if (options.index == null
    || (typeof options.index !== 'string' || options.index === '')) {
    console.log('Error: "index" option is required');
    return false;
  }

  if (options.query == null
    || (typeof options.query !== 'string' && typeof options.query !== 'object')) {
    console.log('Error: "query" must either be a string or an object');
    return false;
  }

  if (options.scrollDuration
    && (typeof options.scrollDuration !== 'string')) {
    console.log('Error: "scrollDuration" must be a duration string (i.e. 1s, 10s, 1m)');
    return false;
  }

  if (options.scrollSize
    && (isNaN(parseFloat(options.scrollSize)) && !isFinite(options.scrollSize))) {
    console.log('Error: "scrollSize" must be a number');
    return false;
  }

  return true;
}
