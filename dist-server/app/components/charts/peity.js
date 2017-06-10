"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Import Peity chart library
require("peity");
var PeityDirective = (function () {
    function PeityDirective(element) {
        this.initFlag = false;
        this.element = element;
    }
    // Initialise
    PeityDirective.prototype.ngOnInit = function () {
        this.initFlag = true;
        if (this.options || this.type) {
            this.build();
        }
    };
    // Build
    PeityDirective.prototype.build = function () {
        // Check if peity is available
        if (typeof jQuery(this.element).peity === 'undefined') {
            throw new Error('Configuration issue: Embedding peity lib is mandatory');
        }
        // Let's build chart
        this.chart = jQuery(this.element.nativeElement).peity(this.type, this.options);
    };
    // Change
    PeityDirective.prototype.ngOnChanges = function () {
        if (this.initFlag) {
            this.build();
        }
    };
    return PeityDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PeityDirective.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PeityDirective.prototype, "type", void 0);
PeityDirective = __decorate([
    core_1.Directive({
        selector: 'span[peity]',
        exportAs: 'peity-chart',
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], PeityDirective);
exports.PeityDirective = PeityDirective;
var PeityModule = (function () {
    function PeityModule() {
    }
    return PeityModule;
}());
PeityModule = __decorate([
    core_1.NgModule({
        declarations: [
            PeityDirective
        ],
        exports: [
            PeityDirective
        ],
        imports: []
    })
], PeityModule);
exports.PeityModule = PeityModule;
//# sourceMappingURL=peity.js.map