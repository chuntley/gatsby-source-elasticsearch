import assert from 'assert'
import validation from './validation'

describe('Options Validation', function() {
  const validOptions = {
    connection: 'localhost:9200',
    typeName: 'testName',
    index: 'testIndex',
    query: 'test:this'
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

    assert.equal(validation(options), false)
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
});
