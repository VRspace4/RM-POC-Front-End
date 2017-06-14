import * as readline from 'readline';

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

r1.on("SIGUSR2", function () {
  console.log('inside r1');
  process.emit("SIGUSR2");
});

process.on('SIGINT', function () {
  console.log('closing....mm');
  process.exit();
});

// For nodemon restarts
process.on('SIGUSR2', function () {
  console.log('closing from nodemon...');
  process.exit();
});

console.log('starting 7' +
  '');

setInterval(() => {
  console.log('hi there');
}, 2000);
