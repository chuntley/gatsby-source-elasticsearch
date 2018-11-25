import assert from 'assert'
import { isValid } from './validation'

const validation = isValid;

describe('Options Validation', () => {
  const validOptions = {
    connection: 'localhost:9200',
    typeName: 'testName',
    index: 'testIndex',
    query: 'test:this',
    scrollDuration: '30s',
    scrollSize: 999,
  }

  describe('Validates the typeName field', () => {
    const options = { ...validOptions };
    delete options.typeName;

    it('Fails with no typeName', () =>
      assert.equal(validation(options), false));

    it('Fails with null', () =>
      assert.equal(validation({ ...options, typeName: null }), false));

    it('Fails with empty string', () =>
    assert.equal(validation({ ...options, typeName: '' }), false));

    it('Succeed with non-empty string', () =>
      assert.equal(validation({ ...options, typeName: 'test' }), true));

  });

  describe('Validates the index field', () => {
    const options = { ...validOptions };
    delete options.index;

    it('Fails with no index', () =>
      assert.equal(validation(options), false));

    it('Fails with null', () =>
      assert.equal(validation({ ...options, index: null }), false));

    it('Fails with empty string', () =>
      assert.equal(validation({ ...options, index: '' }), false));

    it('Succeed with non-empty string', () =>
      assert.equal(validation({ ...options, index: 'test' }), true));

  });

  describe('Validates the query field', () => {
    const options = { ...validOptions };
    delete options.query;

    // it('Fails with no query', () =>
    //   assert.equal(validation(options), false));

    it('Fails with null', () =>
      assert.equal(validation({ ...options, query: null }), false));

    it('Succeed with empty string', () =>
      assert.equal(validation({ ...options, query: '' }), true));

    it('Succeed with non-empty string', () =>
      assert.equal(validation({ ...options, query: 'test' }), true));

    it('Succeed with object', () =>
      assert.equal(validation({ ...options, query: { test: 'this' } }), true));

  });

  describe('Validates the connection field', () => {
    const options = { ...validOptions };
    delete options.connection;

    it('Fails with no connection', () =>
      assert.equal(validation(options), false));

    it('Fails with null', () =>
      assert.equal(validation({ ...options, connection: null }), false));

    it('Fails with empty string', () =>
      assert.equal(validation({ ...options, connection: '' }), false));

    it('Succeed with non-empty string', () =>
      assert.equal(validation({ ...options, connection: 'localhost:9200' }), true));

    it('Succeed with object', () =>
      assert.equal(validation({ ...options, connection: { host: 'localhost:9200' } }), true));

  });

  describe('Validates the scrollDuration field', () => {
    const options = { ...validOptions };
    delete options.scrollDuration;

    it('Succeed with no scrollDuration', () =>
      assert.equal(validation(options), true)); // not required

    it('Succeed with null', () =>
      assert.equal(validation({ ...options, scrollDuration: null }), true)); // not required

    it('Succeed with empty string', () =>
      assert.equal(validation({ ...options, scrollDuration: '' }), true)); // not required

    it('Succeed with non-empty string', () =>
      assert.equal(validation({ ...options, scrollDuration: 'sdf' }), true));

    it('Succeed with object', () =>
      assert.equal(validation({ ...options, scrollDuration: '1m' }), true));

    it('Fails with integer', () =>
      assert.equal(validation({ ...options, scrollDuration: 123 }), false));

  });

  describe('Validates the scrollSize field', () => {
    const options = { ...validOptions };
    delete options.scrollSize;

    it('Succeed with no scrollSize', () =>
      assert.equal(validation(options), true)); // not required

    it('Succeed with null', () =>
      assert.equal(validation({ ...options, scrollSize: null }), true)); // not required

    it('Succeed with empty string', () =>
      assert.equal(validation({ ...options, scrollSize: '' }), true)); // not required

    it('Succeed with non-empty string', () =>
      assert.equal(validation({ ...options, scrollSize: 'sdf' }), false));

    it('Fails with integer', () =>
      assert.equal(validation({ ...options, scrollSize: 123 }), true));

  });
});
