import {HighLevelConsumer, KeyedMessage, Client, ZKOptions, Topic, ConsumerOptions} from 'kafka-node';
import * as avro from 'avsc';
const avroSchema = {
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
    }]
};

const type = avro.parse(avroSchema);

console.log('Waiting for a bit...');

const client = new Client('rm-backend:2181', 'rm-demo-test-client');

const topics: Array<Topic> = [{
  topic: 'rm-demo'
}];

const options: ConsumerOptions = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'buffer'
};

const consumer = new HighLevelConsumer(client, topics, options);

process.on('SIGINT', function () {
  console.log('closing....mm');
  consumer.close(true, function () {
    process.exit();
  });
});


consumer.on('message', function(message: any) {
  console.log('message: ', message);
  // const buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
  // const decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix
  // console.log('decoded: ', decodedMessage);
});

consumer.on('error', function(err) {
  console.log('error', err);
});


//
console.log('Runing 4');
