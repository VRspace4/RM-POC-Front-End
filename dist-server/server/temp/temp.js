"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_node_1 = require("kafka-node");
var avro = require("avsc");
var avroSchema = {
    name: 'MyAwesomeType',
    type: 'record',
    fields: [
        {
            name: 'id',
            type: 'string'
        }, {
            name: 'timestamp',
            type: 'double'
        }, {
            name: 'enumField',
            type: {
                name: 'EnumField',
                type: 'enum',
                symbols: ['sym1', 'sym2', 'sym3']
            }
        }
    ]
};
var type = avro.parse(avroSchema);
console.log('Waiting for a bit...');
var client = new kafka_node_1.Client('rm-backend:2181', 'rm-demo-test-client');
var topics = [{
        topic: 'rm-demo'
    }];
var options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'buffer'
};
var consumer = new kafka_node_1.HighLevelConsumer(client, topics, options);
process.on('SIGINT', function () {
    console.log('closing....mm');
    consumer.close(true, function () {
        process.exit();
    });
});
consumer.on('message', function (message) {
    console.log('message: ', message);
    // const buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
    // const decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix
    // console.log('decoded: ', decodedMessage);
});
consumer.on('error', function (err) {
    console.log('error', err);
});
//
console.log('Runing 4');
//# sourceMappingURL=temp.js.map