export default function query(options) {
  let result = {
    index: options.index,
    scroll: options.scrollDuration || '30s',
    size: options.scrollSize || 1000,
  }

  if (typeof options.query === 'object') Object.assign(result, { body: { query: options.query } })
  if (typeof options.query === 'string') Object.assign(result, { q: options.query })

  return result;
}
