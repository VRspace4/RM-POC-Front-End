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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var basicLayout_component_1 = require("./basicLayout.component");
var blankLayout_component_1 = require("./blankLayout.component");
var topNavigationLayout_component_1 = require("./topNavigationLayout.component");
var navigation_component_1 = require("./../navigation/navigation.component");
var footer_component_1 = require("./../footer/footer.component");
var topnavbar_component_1 = require("./../topnavbar/topnavbar.component");
var topnavigationnavbar_component_1 = require("./../topnavbar/topnavigationnavbar.component");
var basic_layout_no_top_component_1 = require("./basic-layout-no-top/basic-layout-no-top.component");
var LayoutsModule = (function () {
    function LayoutsModule() {
    }
    return LayoutsModule;
}());
LayoutsModule = __decorate([
    core_1.NgModule({
        declarations: [
            footer_component_1.FooterComponent,
            basicLayout_component_1.BasicLayoutComponent,
            blankLayout_component_1.BlankLayoutComponent,
            navigation_component_1.NavigationComponent,
            topNavigationLayout_component_1.TopNavigationLayoutComponent,
            topnavbar_component_1.TopNavbarComponent,
            topnavigationnavbar_component_1.TopNavigationNavbarComponent,
            basic_layout_no_top_component_1.BasicLayoutNoTopComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule,
            ngx_bootstrap_1.BsDropdownModule.forRoot()
        ],
        exports: [
            footer_component_1.FooterComponent,
            basicLayout_component_1.BasicLayoutComponent,
            blankLayout_component_1.BlankLayoutComponent,
            navigation_component_1.NavigationComponent,
            topNavigationLayout_component_1.TopNavigationLayoutComponent,
            topnavbar_component_1.TopNavbarComponent,
            topnavigationnavbar_component_1.TopNavigationNavbarComponent,
            basic_layout_no_top_component_1.BasicLayoutNoTopComponent
        ],
    })
], LayoutsModule);
exports.LayoutsModule = LayoutsModule;
//# sourceMappingURL=layouts.module.js.map