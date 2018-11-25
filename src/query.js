export default function query(options) {
  let result = {
    index: options.index,
    scroll: options.scrollDuration || '30s',
    size: options.scrollSize || 1000,
  }

  if (typeof options.query === 'object') {
    return {
      ...result,
      body: {
        ...options.query,
      },
    };
  }

  if (typeof options.query === 'string') {
    return {
      ...result,
      q: options.query,
    };
  }

  return result;
}
