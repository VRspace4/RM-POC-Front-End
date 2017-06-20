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
var Dashboard3Component = (function () {
    function Dashboard3Component() {
        this.lineChartData = [
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Example data 1' },
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Example data 2' },
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartType = 'line';
        this.lineChartColors = [
            {
                backgroundColor: "rgba(26,179,148,0.5)",
                borderColor: "rgba(26,179,148,0.7)",
                pointBackgroundColor: "rgba(26,179,148,1)",
                pointBorderColor: "#fff",
            },
            {
                backgroundColor: "rgba(220,220,220,0.5)",
                borderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "rgba(220,220,220,1)",
                pointBorderColor: "#fff",
            }
        ];
        this.peityType1 = "bar";
        this.peityType2 = "line";
        this.peityOptions1 = { fill: ["#1ab394", "#d7d7d7"], width: 100 };
        this.peityOptions2 = { fill: ["#1ab394", "#d7d7d7"] };
        this.peityOptions3 = { fill: '#1ab394', stroke: '#169c81' };
        this.nav = document.querySelector('nav.navbar');
        this.wrapper = document.getElementById('page-wrapper');
    }
    Dashboard3Component.prototype.ngOnInit = function () {
        this.nav.className += " white-bg";
        this.wrapper.className += " sidebar-content";
    };
    Dashboard3Component.prototype.ngOnDestroy = function () {
        this.nav.classList.remove("white-bg");
        this.wrapper.classList.remove("sidebar-content");
    };
    return Dashboard3Component;
}());
Dashboard3Component = __decorate([
    core_1.Component({
        selector: 'dashboard3',
        templateUrl: 'dashboard3.template.html'
    }),
    __metadata("design:paramtypes", [])
], Dashboard3Component);
exports.Dashboard3Component = Dashboard3Component;
//# sourceMappingURL=dashboard3.component.js.map