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
var Dashboard41Component = (function () {
    function Dashboard41Component() {
        this.lineChartData = [
            { data: [48, 48, 60, 39, 56, 37, 30], label: 'Example data 1' },
            { data: [65, 59, 40, 51, 36, 25, 40], label: 'Example data 2' },
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
        this.flotDataset = [
            { label: "Data 1", data: [[1262304000000, 6], [1264982400000, 3057], [1267401600000, 20434], [1270080000000, 31982], [1272672000000, 26602], [1275350400000, 27826], [1277942400000, 24302], [1280620800000, 24237], [1283299200000, 21004], [1285891200000, 12144], [1288569600000, 10577], [1291161600000, 10295]], color: '#17a084' },
            { label: "Data 2", data: [[1262304000000, 5], [1264982400000, 200], [1267401600000, 1605], [1270080000000, 6129], [1272672000000, 11643], [1275350400000, 19055], [1277942400000, 30062], [1280620800000, 39197], [1283299200000, 37000], [1285891200000, 27000], [1288569600000, 21000], [1291161600000, 17000]], color: '#127e68' }
        ];
        this.flotOptions = {
            xaxis: {
                tickDecimals: 0
            },
            series: {
                lines: {
                    show: true,
                    fill: true,
                    fillColor: {
                        colors: [{
                                opacity: 1
                            }, {
                                opacity: 1
                            }]
                    },
                },
                points: {
                    width: 0.1,
                    show: false
                },
            },
            grid: {
                show: false,
                borderWidth: 0
            },
            legend: {
                show: false,
            }
        };
        this.peityType = "pie";
        this.peityOptions = { fill: ['#1ab394', '#d7d7d7', '#ffffff'] };
        this.nav = document.querySelector('nav.navbar');
        this.body = document.querySelector("body");
    }
    Dashboard41Component.prototype.ngOnInit = function () {
        this.nav.className += " white-bg";
        this.body.className += " top-navigation";
    };
    Dashboard41Component.prototype.ngOnDestroy = function () {
        this.nav.classList.remove("white-bg");
        this.body.classList.remove("top-navigation");
    };
    return Dashboard41Component;
}());
Dashboard41Component = __decorate([
    core_1.Component({
        selector: 'dashboard41',
        templateUrl: 'dashboard41.template.html'
    }),
    __metadata("design:paramtypes", [])
], Dashboard41Component);
exports.Dashboard41Component = Dashboard41Component;
//# sourceMappingURL=dashboard41.component.js.map