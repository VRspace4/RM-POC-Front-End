"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var basic_layout_no_top_component_1 = require("./basic-layout-no-top.component");
var core_1 = require("@angular/core");
describe('BasicLayoutNoTopComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [basic_layout_no_top_component_1.BasicLayoutNoTopComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(basic_layout_no_top_component_1.BasicLayoutNoTopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=basic-layout-no-top.component.spec.js.map