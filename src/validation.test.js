import assert from 'assert'
import { isValid } from './validation'

const validation = isValid;

describe('Options Validation', function() {
  const validOptions = {
    connection: 'localhost:9200',
    typeName: 'testName',
    index: 'testIndex',
    query: 'test:this',
    scrollDuration: '30s',
    scrollSize: 999,
  }

  it('validates the typeName field', function() {
    const options = Object.assign({}, validOptions);
    delete options.typeName;

    assert.equal(validation(options), false)
    assert.equal(validation(Object.assign({}, options, { typeName: null })), false)
    assert.equal(validation(Object.assign({}, options, { typeName: '' })), false)
    assert.equal(validation(Object.assign({}, options, { typeName: 'test' })), true)
  });

  it('validates the index field', function() {
    const options = Object.assign({}, validOptions);
    delete options.index;

    assert.equal(validation(options), false)
    assert.equal(validation(Object.assign({}, options, { index: null })), false)
    assert.equal(validation(Object.assign({}, options, { index: '' })), false)
    assert.equal(validation(Object.assign({}, options, { index: 'test' })), true)
  });
  
  it('validates the query field', function() {
    const options = Object.assign({}, validOptions);
    delete options.query;

    // assert.equal(validation(options), false)
    assert.equal(validation(Object.assign({}, options, { query: null })), false)
    assert.equal(validation(Object.assign({}, options, { query: '' })), true)
    assert.equal(validation(Object.assign({}, options, { query: 'test' })), true)
    assert.equal(validation(Object.assign({}, options, { query: { test: 'this' } })), true)
  });

  it('validates the connection field', function() {
    const options = Object.assign({}, validOptions);
    delete options.connection;

    assert.equal(validation(options), false)
    assert.equal(validation(Object.assign({}, options, { connection: null })), false)
    assert.equal(validation(Object.assign({}, options, { connection: '' })), false)
    assert.equal(validation(Object.assign({}, options, { connection: 'localhost:9200' })), true)
    assert.equal(validation(Object.assign({}, options, { connection: { host: 'localhost:9200' } })), true)
  });

  it('validates the scrollDuration field', function() {
    const options = Object.assign({}, validOptions);
    delete options.scrollDuration;

    assert.equal(validation(options), true) // not required
    assert.equal(validation(Object.assign({}, options, { scrollDuration: null })), true) // not required
    assert.equal(validation(Object.assign({}, options, { scrollDuration: '' })), true) // not required
    assert.equal(validation(Object.assign({}, options, { scrollDuration: 'sdf' })), true)
    assert.equal(validation(Object.assign({}, options, { scrollDuration: '1m' })), true)
    assert.equal(validation(Object.assign({}, options, { scrollDuration: 123 })), false)
  });

  it('validates the scrollSize field', function() {
    const options = Object.assign({}, validOptions);
    delete options.scrollSize;

    assert.equal(validation(options), true) // not required
    assert.equal(validation(Object.assign({}, options, { scrollSize: null })), true) // not required
    assert.equal(validation(Object.assign({}, options, { scrollSize: '' })), true) // not required
    assert.equal(validation(Object.assign({}, options, { scrollSize: 'sdf' })), false)
    assert.equal(validation(Object.assign({}, options, { scrollSize: 123 })), true)
  });
});
