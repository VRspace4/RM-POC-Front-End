"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root_model_1 = require("./root-model");
describe('RM Models', function () {
    var rootModel;
    beforeEach(function () {
        rootModel = new root_model_1.RootModel('Production');
    });
    describe('Transponder', function () {
        it('should have a valid object', function () {
            expect(rootModel.transponders[0].name).toBe('Transponder 1');
        });
    });
});
//# sourceMappingURL=rm-models.spec.js.map