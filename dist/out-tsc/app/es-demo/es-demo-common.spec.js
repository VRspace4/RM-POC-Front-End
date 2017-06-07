"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transponder_1 = require("./models/transponder");
var customer_added_event_1 = require("./events/customer-added-event");
describe('es-demo-models-events', function () {
    var transponder;
    beforeEach(function () {
        transponder = new transponder_1.Transponder('Transponder 1');
    });
    it('[Model] Transponder - Basic', function () {
        expect(transponder.name).toBe('Transponder 1');
    });
    it('[Event] CustomerAddedEvent - Process', function () {
        var customerAddedEvent = new customer_added_event_1.CustomerAddedEvent(transponder, 'Intelsat');
        customerAddedEvent.process();
        expect(transponder.getCustomer(customerAddedEvent.id).name).toBe(customerAddedEvent.name);
    });
});
//# sourceMappingURL=es-demo-common.spec.js.map