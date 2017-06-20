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
var router_1 = require("@angular/router");
require("jquery-slimscroll");
var app_helpers_1 = require("../../../app.helpers");
var NavigationComponent = (function () {
    function NavigationComponent(router) {
        this.router = router;
    }
    NavigationComponent.prototype.ngAfterViewInit = function () {
        jQuery('#side-menu').metisMenu();
        if (jQuery('body').hasClass('fixed-sidebar')) {
            jQuery('.sidebar-collapse').slimscroll({
                height: '100%'
            });
        }
    };
    NavigationComponent.prototype.activeRoute = function (routename) {
        return this.router.url.indexOf(routename) > -1;
    };
    NavigationComponent.prototype.toggleNavigation = function () {
        jQuery('body').toggleClass('mini-navbar');
        app_helpers_1.smoothlyMenu();
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'navigation',
        templateUrl: 'navigation.template.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map