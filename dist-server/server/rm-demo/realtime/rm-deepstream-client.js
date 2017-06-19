"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepstream = require("deepstream.io-client-js");
var app_globals_1 = require("../../../app/app.globals");
var RmDeepstreamClient = (function () {
    function RmDeepstreamClient() {
    }
    RmDeepstreamClient.startDeepstreamClient = function () {
        this.dsInstance = deepstream(app_globals_1.DsGlobals.serverURI);
        this.dsInstance.login(null, function () {
            console.log('Connected to deepstream server at ' + app_globals_1.DsGlobals.serverURI);
        });
    };
    RmDeepstreamClient.setRootModelRecord = function (rootModel) {
        this.dsInstance.record.setData(app_globals_1.DsGlobals.rootModelRecordName, rootModel, function (error) {
            console.log(rootModel);
            console.error(error);
        });
    };
    RmDeepstreamClient.setRmEventRecord = function (event) {
        this.dsInstance.record.setData(app_globals_1.DsGlobals.eventRecordName, event, function (error) {
            console.error(error);
        });
    };
    return RmDeepstreamClient;
}());
exports.RmDeepstreamClient = RmDeepstreamClient;
//# sourceMappingURL=rm-deepstream-client.js.map