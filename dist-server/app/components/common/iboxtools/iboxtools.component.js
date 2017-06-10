"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IboxtoolsComponent = (function () {
    function IboxtoolsComponent() {
    }
    IboxtoolsComponent.prototype.collapse = function (e) {
        e.preventDefault();
        var ibox = jQuery(e.target).closest('div.ibox');
        var button = jQuery(e.target).closest('i');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    };
    IboxtoolsComponent.prototype.close = function (e) {
        e.preventDefault();
        var content = jQuery(e.target).closest('div.ibox');
        content.remove();
    };
    return IboxtoolsComponent;
}());
IboxtoolsComponent = __decorate([
    core_1.Component({
        selector: 'iboxtools',
        templateUrl: 'iboxtools.template.html'
    })
], IboxtoolsComponent);
exports.IboxtoolsComponent = IboxtoolsComponent;
//# sourceMappingURL=iboxtools.component.js.map