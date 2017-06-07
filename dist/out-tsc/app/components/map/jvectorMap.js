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
// Import Chart.js library
require("./../../../../node_modules/jvectormap/jquery-jvectormap.min.js");
require("./../../../../node_modules/jvectormap/tests/assets/jquery-jvectormap-world-mill-en.js");
var JVectorMapDirective = (function () {
    function JVectorMapDirective(element) {
        this.initFlag = false;
        this.element = element;
    }
    // Initialise
    JVectorMapDirective.prototype.ngOnInit = function () {
        this.initFlag = true;
        if (this.options) {
            this.build();
        }
    };
    // Build
    JVectorMapDirective.prototype.build = function () {
        // Clear before rebuild
        this.ngOnDestroy();
        // Check if Flot is available
        if (typeof jQuery(this.element.nativeElement).vectorMap === 'undefined') {
            throw new Error('Configuration issue: Embedding jvectormap lib is mandatory');
        }
        // Let's build chart
        this.map = jQuery(this.element.nativeElement).vectorMap(this.options);
    };
    // Change
    JVectorMapDirective.prototype.ngOnChanges = function (changes) {
        if (this.initFlag) {
            this.build();
        }
    };
    // Destroy
    JVectorMapDirective.prototype.ngOnDestroy = function () {
        if (this.map) {
            this.map.remove();
        }
    };
    return JVectorMapDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], JVectorMapDirective.prototype, "options", void 0);
JVectorMapDirective = __decorate([
    core_1.Directive({
        selector: 'div[jvectormap]',
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], JVectorMapDirective);
exports.JVectorMapDirective = JVectorMapDirective;
var JVectorMapModule = (function () {
    function JVectorMapModule() {
    }
    return JVectorMapModule;
}());
JVectorMapModule = __decorate([
    core_1.NgModule({
        declarations: [
            JVectorMapDirective
        ],
        exports: [
            JVectorMapDirective
        ],
        imports: []
    })
], JVectorMapModule);
exports.JVectorMapModule = JVectorMapModule;
//# sourceMappingURL=jvectorMap.js.map