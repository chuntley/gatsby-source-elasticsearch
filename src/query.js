const isString = data =>
  typeof data === 'string';

const isObject = data =>
  typeof data === 'object';

export default ({ index, scrollDuration, scrollSize, query, body, type }) => {
  const result = {
    index,
    type,
    scroll: scrollDuration || '30s',
    size: scrollSize || 1000,
  }

  if (isObject(body)) {
    return {
      ...result,
      body: body,
    }
  }

  if (isObject(query)) {
    return {
      ...result,
      body: {
        query,
      },
    };
  }

  if (isString(query)) {
    return {
      ...result,
      q: query,
    };
  }

  return result;
}
