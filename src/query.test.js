import assert from 'assert'
import query from './query'

describe('Query Builder', function() {
  it('builds an empty query', function() {
    const options = {
      index: 'testIndex',
    }

    assert.deepEqual(query(options), { index: 'testIndex', scroll: '30s', size: 1000 })
  });

  it('builds a string query', function() {
    const options = {
      index: 'testIndex',
      query: 'test query'
    }

    assert.deepEqual(query(options), { 
      index: 'testIndex', 
      scroll: '30s', 
      size: 1000,
      q: 'test query',
    })
  });

  it('builds an object query', function() {
    const options = {
      index: 'testIndex',
      query: { test: 'query' },
    }

    assert.deepEqual(query(options), { 
      index: 'testIndex', 
      scroll: '30s', 
      size: 1000,
      body: {
        query: {
          test: "query"
        }
      }
    })
  });

  it('sets the scroll size', function() {
    const options = {
      index: 'testIndex',
      scrollSize: 555,
    }

    assert.deepEqual(query(options), { index: 'testIndex', scroll: '30s', size: 555 })
  });

  it('sets the scroll duration', function() {
    const options = {
      index: 'testIndex',
      scrollDuration: '1m',
    }

    assert.deepEqual(query(options), { index: 'testIndex', scroll: '1m', size: 1000 })
  });
});
