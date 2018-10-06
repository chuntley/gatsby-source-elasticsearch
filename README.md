# gatsby-source-elasticsearch

Gatsby source plugin for Elasticsearch.

This plugin uses the Elastisearch Scroll API to obtain any number of documents.

## Installation

```sh
npm install gatsby-source-elasticsearch
```

or

```sh
yarn add gatsby-source-elasticsearch
```

## Options

| Option | Description | Type |
| --- | --- | --- |
| connection | Connection details | string, object |
| index | The index to query against | string |
| typeName | The type name to generate in Gatsby | string |
| query | The query to run | string, object |
| scrollDuration | Scroll duration (default: 30s) | string |
| scrollSize | Scroll size (default: 1000) | integer |

For more information on `scrollDuration` and `scrollSize`, check out the [Scroll documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html). `scrollDuration` maps to the `scroll` parameter in the documentation, and `scrollSize` to `size`.

## Config Examples

### Basic

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-elasticsearch',
      options: {
        connection: 'http://localhost:9200',
        index: 'test-*',
        typeName: 'testDocs',
        query: 'type:test'
      },
    },
  ],
};
```

### Advanced Connection Option

If you pass the connection option as an object, you can use [Elasticsearch client configuration options](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html).

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-elasticsearch',
      options: {
        connection: {
          host: 'http://localhost:9200',
          log: 'info',
        },
        // ...
      },
    },
  ],
};
```

### Advanced Query Option

If you pass the query option as an object, you can build a normal [Elasticsearch search query](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search). Otherwise, when it is passed in as a string it uses [Elasticsearch query strings](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html)

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-elasticsearch',
      options: {
        query: {
          bool: {
            filter: [
              { term: { test: 'this' } },
            ],
          },
        },
        // ...
      },
    },
  ],
};
```

NOTE: This plugin does not support aggregations.
