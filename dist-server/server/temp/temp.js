"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
node_fetch_1.default('http://localhost:4000/graphql?query={customers{id,name}}')
    .then(function (res) {
    return res.json();
}).then(function (body) {
    console.log(JSON.stringify(body));
});
//# sourceMappingURL=temp.js.map