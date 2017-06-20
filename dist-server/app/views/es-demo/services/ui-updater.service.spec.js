"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ui_updater_service_1 = require("./ui-updater.service");
describe('UiUpdaterService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [ui_updater_service_1.UiUpdaterService]
        });
    });
    it('should be created', testing_1.inject([ui_updater_service_1.UiUpdaterService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=ui-updater.service.spec.js.map