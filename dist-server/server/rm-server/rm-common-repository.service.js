"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var key_value_1 = require("../../app/es-demo/models/key-value");
var app_globals_1 = require("../../app/app.globals");
var rm_command_repository_service_1 = require("./command/rm-command-repository.service");
var RmCommonRepository = (function () {
    function RmCommonRepository() {
    }
    RmCommonRepository.getDataNode = function (dataNodeName) {
        var command = "MATCH (dataNode:Data {name: '" + dataNodeName + "'}) RETURN dataNode";
        return new Promise(function (resolve, reject) {
            rm_command_repository_service_1.RmCommandRepository._session.run(command).then(function (result) {
                var keys = [];
                var values = [];
                var resultObj = result.records[0].get(0).properties;
                for (var key in resultObj) {
                    if (resultObj.hasOwnProperty(key)) {
                        keys.push(key);
                        values.push(resultObj[key]);
                    }
                    ;
                }
                ;
                var keyValue = new key_value_1.KeyValue(keys, values);
                resolve(keyValue);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    RmCommonRepository.setDataNode = function (dataNodeName, key, value) {
        var command = "MERGE (n:Data {name: '" + app_globals_1.Neo4jGlobals.rmDemoDataName + "'}) \n                      SET n." + key + " = '" + value + "'\n                      RETURN n";
        return rm_command_repository_service_1.RmCommandRepository._session.run(command);
    };
    return RmCommonRepository;
}());
exports.RmCommonRepository = RmCommonRepository;
//# sourceMappingURL=rm-common-repository.service.js.map