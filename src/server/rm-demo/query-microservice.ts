import {HighLevelConsumer, KeyedMessage, Client, ZKOptions, Topic, ConsumerOptions} from 'kafka-node';

setTimeout(() => {
  console.log('Starting message consumer...');
  const client = new Client('rm:2181', 'rm-demo-test-client');

  const topics: Array<Topic> = [{
    topic: 'rm-demo'
  }];

  const options: ConsumerOptions = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8'
  };

  const consumer = new HighLevelConsumer(client, topics, options);

  process.on('SIGINT', function () {
    console.log('Shutting down message consumer...');
    consumer.close(true, function () {
      process.exit();
    });
  });

  // For nodemonxxxbbb
  process.once('SIGUSR2', function () {
    consumer.close(false, function () {
      console.log('Restarting message consumer...');
      process.kill(process.pid, 'SIGUSR2');
    });
  });


  consumer.on('message', function (message: any) {
    console.log('object: ', message);
    console.log('message: ', JSON.parse(message.value));
    // const buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
    // const decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix
    // console.log('decoded: ', decodedMessage);
  });

  consumer.on('error', function (err) {
    console.log('error', err);
  });

}, 3000);
