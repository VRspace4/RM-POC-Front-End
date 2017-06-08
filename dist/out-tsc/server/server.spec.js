"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appGlobal = require("../app/app.globals");
var server = require("./server");
var node_fetch_1 = require("node-fetch");
describe('server', function () {
    var serverInstance;
    //
    beforeEach(function (done) {
        serverInstance = server.run(done);
    });
    afterEach(function (done) {
        serverInstance.close(done);
    });
    it('testing zzz', function (done) {
        node_fetch_1.default(appGlobal.url + '/hello').then(function (response) {
            return response.text();
        }).then(function (response) {
            console.log("**** response = ", response);
            done();
        });
    });
    it('testing #2', function () {
        expect(true).toEqual(true);
    });
});
//# sourceMappingURL=server.spec.js.map