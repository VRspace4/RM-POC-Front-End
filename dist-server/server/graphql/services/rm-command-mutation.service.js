"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_globals_1 = require("../../../app/app.globals");
var node_fetch_1 = require("node-fetch");
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
exports.removeCustomer = function (id) {
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
exports.addTransponder = function (name, powerLimit, bandwidth) {
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
exports.removeTransponder = function (id) {
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
exports.addAllocation = function (allocationName, startFrequency, stopFrequency, powerUsage, transponderId, customerId, originatorId) {
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
exports.removeAllocation = function (transponderId, allocationId) {
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
exports.resetRootModel = function (name) {
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
exports.addOriginator = function (name) {
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
exports.removeOriginator = function (id) {
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
//# sourceMappingURL=rm-command-mutation.service.js.map