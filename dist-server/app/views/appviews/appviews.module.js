"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var starterview_component_1 = require("./starterview.component");
var login_component_1 = require("./login.component");
var peity_1 = require("../../components/charts/peity");
var sparkline_1 = require("../../components/charts/sparkline");
var AppviewsModule = (function () {
    function AppviewsModule() {
    }
    return AppviewsModule;
}());
AppviewsModule = __decorate([
    core_1.NgModule({
        declarations: [
            starterview_component_1.StarterViewComponent,
            login_component_1.LoginComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule,
            peity_1.PeityModule,
            sparkline_1.SparklineModule
        ],
        exports: [
            starterview_component_1.StarterViewComponent,
            login_component_1.LoginComponent
        ],
    })
], AppviewsModule);
exports.AppviewsModule = AppviewsModule;
//# sourceMappingURL=appviews.module.js.map