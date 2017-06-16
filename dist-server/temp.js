"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventObject = {
    name: "TransponderAddedEvent",
    parent: null,
    transpondderName: "Transponder 1",
    transponderId: "424ae987"
};
function verifyEventObject(eventObject, eventActual) {
    for (var keyName in eventActual) {
        if (eventObject.hasOwnProperty(keyName) == false) {
            console.log('failed');
        }
    }
}
//# sourceMappingURL=temp.js.map