"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var catalog_api_service_1 = require("./catalog-api.service");
describe('CatalogApiService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [catalog_api_service_1.CatalogApiService]
        });
    });
    it('should be created', testing_1.inject([catalog_api_service_1.CatalogApiService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=catalog-api.service.spec.js.map