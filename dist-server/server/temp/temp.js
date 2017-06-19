"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
node_fetch_1.default('http://localhost:4500/helloworld').then(function (res) {
    return res.text();
}).then(function (body) {
    console.log(body);
});
//# sourceMappingURL=temp.js.map