'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let sourceNodes = exports.sourceNodes = (() => {
  var _ref = _asyncToGenerator(function* ({ boundActionCreators }, options) {
    const createNode = boundActionCreators.createNode;


    if (!(0, _validation2.default)(options)) return;

    let clientOptions;
    if (typeof options.connection === 'string') clientOptions = { host: options.connection };
    if (typeof options.connection === 'object') clientOptions = options.connection;

    const client = new _elasticsearch2.default.Client(clientOptions);

    // Start scroll with initial query
    let totalProcessed = 0;
    const responseQueue = [];
    responseQueue.push((yield client.search((0, _query2.default)(options))));

    while (responseQueue.length) {
      const response = responseQueue.shift();

      // create nodes from the documents in the response
      response.hits.hits.forEach(function (hit) {
        const _id = hit._id,
              _source = hit._source;


        createNode(_extends({}, _source, {
          id: _id,
          parent: null,
          children: [],
          internal: {
            type: options.typeName,
            contentDigest: createContentDigest(_source)
          }
        }));

        totalProcessed++;
      });

      // check to see if we have collected all of the documents
      if (totalProcessed >= response.hits.total) {
        console.log(options.logMessage || `\nSuccessfully processed ${totalProcessed} ${options.typeName} documents\n`);
        break;
      }

      // Continue scroll query
      responseQueue.push((yield client.scroll({
        scrollId: response._scroll_id,
        scroll: '30s'
      })));
    }
  });

  return function sourceNodes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createContentDigest = obj => _crypto2.default.createHash('md5').update(JSON.stringify(obj)).digest('hex');