"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ui_graph_service_1 = require("./ui-graph.service");
describe('UiGraphService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [ui_graph_service_1.UiGraphService]
        });
    });
    it('should be created', testing_1.inject([ui_graph_service_1.UiGraphService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=ui-graph.service.spec.js.map