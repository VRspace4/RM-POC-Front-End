"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_globals_1 = require("../../../app/app.globals");
var node_fetch_1 = require("node-fetch");
var rm_command_mutation_library_service_1 = require("./rm-command-mutation-library.service");
var controllerEventsUri = app_globals_1.GeneralGlobals.commandRestUri + "/events";
exports.sendHello = function (name) {
    return node_fetch_1.default(controllerEventsUri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    }).then(function (response) {
        return response.text();
    }).then(function (object) {
        return object;
    });
};
exports.addCustomer = function (name) {
    return rm_command_mutation_library_service_1.RmCommandMutation.addCustomer(name)
        .then(function (object) {
        return object;
    });
};
exports.removeCustomer = function (id) {
    return rm_command_mutation_library_service_1.RmCommandMutation.removeCustomer(id)
        .then(function (object) {
        return object;
    });
};
exports.addTransponder = function (name, powerLimit, bandwidth) {
    return rm_command_mutation_library_service_1.RmCommandMutation.addTransponder(name, powerLimit, bandwidth)
        .then(function (object) {
        return object;
    });
};
exports.removeTransponder = function (id) {
    return rm_command_mutation_library_service_1.RmCommandMutation.removeTransponder(id)
        .then(function (object) {
        return object;
    });
};
exports.addAllocation = function (allocationName, startFrequency, stopFrequency, powerUsage, transponderId, customerId, originatorId) {
    return rm_command_mutation_library_service_1.RmCommandMutation.addAllocation(allocationName, startFrequency, stopFrequency, powerUsage, transponderId, customerId, originatorId)
        .then(function (object) {
        return object;
    });
};
exports.removeAllocation = function (transponderId, allocationId) {
    return rm_command_mutation_library_service_1.RmCommandMutation.removeAllocation(transponderId, allocationId)
        .then(function (object) {
        return object;
    });
};
exports.resetRootModel = function (name) {
    return rm_command_mutation_library_service_1.RmCommandMutation.resetRootModel(name)
        .then(function (object) {
        return object;
    });
};
exports.addOriginator = function (name) {
    return rm_command_mutation_library_service_1.RmCommandMutation.addOriginator(name)
        .then(function (object) {
        return object;
    });
};
exports.removeOriginator = function (id) {
    return rm_command_mutation_library_service_1.RmCommandMutation.removeOriginator(id)
        .then(function (object) {
        return object;
    });
};
//# sourceMappingURL=rm-command-mutation.service.js.map