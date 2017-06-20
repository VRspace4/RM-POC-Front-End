"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_globals_1 = require("../../../app/app.globals");
var node_fetch_1 = require("node-fetch");
var controllerEventsUri = app_globals_1.GeneralGlobals.commandRestUri + "/events";
var RmCommandMutation = (function () {
    function RmCommandMutation() {
    }
    RmCommandMutation.addCustomer = function (name) {
        var bodyString = {
            events: [
                {
                    name: 'CustomerAddedEvent',
                    customerName: name
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.removeCustomer = function (id) {
        var bodyString = {
            events: [
                {
                    name: 'CustomerRemovedEvent',
                    customerId: id
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.addTransponder = function (name, powerLimit, bandwidth) {
        var bodyString = {
            events: [
                {
                    name: 'TransponderAddedEvent',
                    transponderName: name,
                    powerLimit: powerLimit,
                    bandwidth: bandwidth
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.removeTransponder = function (id) {
        var bodyString = {
            events: [
                {
                    name: 'TransponderRemovedEvent',
                    transponderId: id
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.addAllocation = function (allocationName, startFrequency, stopFrequency, powerUsage, transponderId, customerId, originatorId) {
        var bodyString = {
            events: [
                {
                    name: 'AllocationAddedEvent',
                    allocationName: allocationName,
                    startFrequency: startFrequency,
                    stopFrequency: stopFrequency,
                    powerUsage: powerUsage,
                    transponderId: transponderId,
                    customerId: customerId,
                    originatorId: originatorId
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.removeAllocation = function (transponderId, allocationId) {
        var bodyString = {
            events: [
                {
                    name: 'AllocationRemovedEvent',
                    transponderId: transponderId,
                    allocationId: allocationId
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.resetRootModel = function (name) {
        var bodyString = {
            events: [
                {
                    name: 'RootModelAddedEvent',
                    rootModelName: name
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.addOriginator = function (name) {
        var bodyString = {
            events: [
                {
                    name: 'OriginatorAddedEvent',
                    originatorName: name
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    RmCommandMutation.removeOriginator = function (id) {
        var bodyString = {
            events: [
                {
                    name: 'OriginatorRemovedEvent',
                    originatorId: id
                }
            ]
        };
        return node_fetch_1.default(controllerEventsUri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyString)
        }).then(function (response) {
            return response.json();
        }).then(function (object) {
            return object;
        });
    };
    ;
    return RmCommandMutation;
}()); // end
exports.RmCommandMutation = RmCommandMutation;
//# sourceMappingURL=rm-command-mutation-library.service.js.map