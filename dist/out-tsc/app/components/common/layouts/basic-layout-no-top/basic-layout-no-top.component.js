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
var app_helpers_1 = require("../../../../app.helpers");
var BasicLayoutNoTopComponent = (function () {
    function BasicLayoutNoTopComponent() {
    }
    BasicLayoutNoTopComponent.prototype.ngOnInit = function () {
        app_helpers_1.detectBody();
    };
    BasicLayoutNoTopComponent.prototype.onResize = function () {
        app_helpers_1.detectBody();
    };
    return BasicLayoutNoTopComponent;
}());
BasicLayoutNoTopComponent = __decorate([
    core_1.Component({
        selector: 'app-basic-layout-no-top',
        templateUrl: './basic-layout-no-top.component.html',
        styleUrls: ['./basic-layout-no-top.component.css'],
        host: {
            '(window:resize)': 'onResize()'
        }
    }),
    __metadata("design:paramtypes", [])
], BasicLayoutNoTopComponent);
exports.BasicLayoutNoTopComponent = BasicLayoutNoTopComponent;
//# sourceMappingURL=basic-layout-no-top.component.js.map