import assert from 'assert';
import query from './query';

describe('Query Builder', () => {
  it('builds an empty query', () => {
    const options = {
      index: 'testIndex',
    };

    assert.deepEqual(query(options), { index: 'testIndex', scroll: '30s', size: 1000 });
  });

  it('builds a string query', () => {
    const options = {
      index: 'testIndex',
      query: 'test query',
    };

    assert.deepEqual(query(options), {
      index: 'testIndex',
      scroll: '30s',
      size: 1000,
      q: 'test query',
    });
  });

  it('builds an object query', () => {
    const options = {
      index: 'testIndex',
      query: { test: 'query' },
    };

    assert.deepEqual(query(options), {
      index: 'testIndex',
      scroll: '30s',
      size: 1000,
      body: {
        query: {
          test: 'query',
        },
      },
    });
  });

  it('builds an object query body', () => {
    const options = {
      index: 'testIndex',
      body: { query: { test: 'query' } },
    };

    assert.deepEqual(query(options), {
      index: 'testIndex',
      scroll: '30s',
      size: 1000,
      body: {
        query: {
          test: 'query',
        },
      },
    });
  });

  it('sets the scroll size', () => {
    const options = {
      index: 'testIndex',
      scrollSize: 555,
    };

    assert.deepEqual(query(options), { index: 'testIndex', scroll: '30s', size: 555 });
  });

  it('sets the scroll duration', () => {
    const options = {
      index: 'testIndex',
      scrollDuration: '1m',
    };

    assert.deepEqual(query(options), { index: 'testIndex', scroll: '1m', size: 1000 });
  });
});
