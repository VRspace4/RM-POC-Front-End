"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ds_service_1 = require("./ds.service");
describe('DsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [ds_service_1.DsService]
        });
    });
    it('should be created', testing_1.inject([ds_service_1.DsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=ds.service.spec.js.map