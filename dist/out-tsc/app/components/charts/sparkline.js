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
var SparklineDirective = (function () {
    function SparklineDirective(element) {
        this.initFlag = false;
        this.element = element.nativeElement;
    }
    // Initialise
    SparklineDirective.prototype.ngOnInit = function () {
        this.initFlag = true;
        if (this.options || this.datasets) {
            this.build();
        }
    };
    // Build
    SparklineDirective.prototype.build = function () {
        // Check if sparkline is available
        if (typeof jQuery(this.element).sparkline() === 'undefined') {
            throw new Error('Configuration issue: Embedding sparkline lib is mandatory');
        }
        // Let's build chart
        this.chart = jQuery(this.element).sparkline(this.datasets, this.options);
    };
    // Change
    SparklineDirective.prototype.ngOnChanges = function () {
        if (this.initFlag) {
            this.build();
        }
    };
    return SparklineDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SparklineDirective.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SparklineDirective.prototype, "datasets", void 0);
SparklineDirective = __decorate([
    core_1.Directive({
        selector: 'span[sparkline]',
        exportAs: 'sparkline-chart',
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SparklineDirective);
exports.SparklineDirective = SparklineDirective;
var SparklineModule = (function () {
    function SparklineModule() {
    }
    return SparklineModule;
}());
SparklineModule = __decorate([
    core_1.NgModule({
        declarations: [
            SparklineDirective
        ],
        exports: [
            SparklineDirective
        ],
        imports: []
    })
], SparklineModule);
exports.SparklineModule = SparklineModule;
//# sourceMappingURL=sparkline.js.map