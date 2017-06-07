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
var Dashboard5Component = (function () {
    function Dashboard5Component() {
        this.flotDataset = [
            [[0, 4], [1, 8], [2, 5], [3, 10], [4, 4], [5, 16], [6, 5], [7, 11], [8, 6], [9, 11], [10, 20], [11, 10], [12, 13], [13, 4], [14, 7], [15, 8], [16, 12]],
            [[0, 0], [1, 2], [2, 7], [3, 4], [4, 11], [5, 4], [6, 2], [7, 5], [8, 11], [9, 5], [10, 4], [11, 1], [12, 5], [13, 2], [14, 5], [15, 2], [16, 0]]
        ];
        this.flotOptions = {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderWidth: 2,
                color: 'transparent'
            },
            colors: ["#1ab394", "#1C84C6"],
            xaxis: {},
            yaxis: {},
            tooltip: false
        };
        this.sparklineData = [34, 43, 43, 35, 44, 32, 44, 52];
        this.sparklineData2 = [32, 11, 25, 37, 41, 32, 34, 42];
        this.sparklineOptions = { type: 'line', width: '100%', height: '50', lineColor: '#1ab394', fillColor: "transparent" };
        this.nav = document.querySelector('nav.navbar');
    }
    Dashboard5Component.prototype.ngOnInit = function () {
        this.nav.className += " white-bg";
    };
    Dashboard5Component.prototype.ngOnDestroy = function () {
        this.nav.classList.remove("white-bg");
    };
    return Dashboard5Component;
}());
Dashboard5Component = __decorate([
    core_1.Component({
        selector: 'dashboard5',
        templateUrl: 'dashboard5.template.html'
    }),
    __metadata("design:paramtypes", [])
], Dashboard5Component);
exports.Dashboard5Component = Dashboard5Component;
//# sourceMappingURL=dashboard5.component.js.map