import crypto from 'crypto';
import elasticsearch from 'elasticsearch';
import query from './query';
import validation from './validation';

const createContentDigest = obj => crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');

export async function sourceNodes({ boundActionCreators }, options) {
  const { createNode } = boundActionCreators;

  if (!validation(options)) return;

  let clientOptions;
  if (typeof options.connection === 'string') clientOptions = { host: options.connection };
  if (typeof options.connection === 'object') clientOptions = options.connection;

  const client = new elasticsearch.Client(clientOptions);

  // Start scroll with initial query
  let totalProcessed = 0;
  const responseQueue = [];
  responseQueue.push(
    await client.search(query(options)),
  );

  while (responseQueue.length) {
    const response = responseQueue.shift();

    // create nodes from the documents in the response
    response.hits.hits.forEach((hit) => {
      const { _id, _source } = hit;

      createNode({
        ..._source,
        id: _id,
        parent: null,
        children: [],
        internal: {
          type: options.typeName,
          contentDigest: createContentDigest(_source),
        },
      });

      totalProcessed++;
    });

    // check to see if we have collected all of the documents
    if (totalProcessed >= response.hits.total) {
      console.log(`\nSuccessfully processed ${totalProcessed} ${options.typeName} documents\n`);
      break;
    }

    // Continue scroll query
    responseQueue.push(
      await client.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
      }),
    );
  }
}
