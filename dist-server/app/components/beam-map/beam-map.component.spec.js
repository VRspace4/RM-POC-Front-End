"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var beam_map_component_1 = require("./beam-map.component");
var core_1 = require("@angular/core");
describe('BeamMapComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [beam_map_component_1.BeamMapComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(beam_map_component_1.BeamMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=beam-map.component.spec.js.map