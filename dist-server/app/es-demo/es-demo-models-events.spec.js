"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transponder_1 = require("./models/transponder");
var root_model_1 = require("./models/root-model");
describe('es-demo-models-events-services', function () {
    var rootModel;
    beforeEach(function () {
        var transponder = new transponder_1.Transponder('Transponder 1');
        rootModel = new root_model_1.RootModel('Production');
        rootModel.addTransponder(transponder);
    });
    describe('Es-demo services', function () {
    });
});
//# sourceMappingURL=es-demo-models-events.spec.js.map