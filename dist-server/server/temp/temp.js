"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var r1 = readline.createInterface({
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
setInterval(function () {
    console.log('hi there');
}, 2000);
//# sourceMappingURL=temp.js.map