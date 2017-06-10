"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Import Chart.js library
require("chart.js");
var Dashboard1Component = (function () {
    function Dashboard1Component() {
        // Dounghunt chart
        this.doughnutChartType = 'doughnut';
        this.doughnutChartLabels1 = ['App', 'Software', 'Laptop'];
        this.doughnutChartData1 = [70, 27, 85];
        this.doughnutChartLabels2 = ['App', 'Software', 'Laptop'];
        this.doughnutChartData2 = [300, 50, 100];
        this.colors = [{ backgroundColor: ["#a3e1d4", "#dedede", "#9CC3DA"] }];
        // Main Chart
        this.flotDataset = [
            [[0, 4], [1, 8], [2, 5], [3, 10], [4, 4], [5, 16], [6, 5], [7, 11], [8, 6], [9, 11], [10, 30], [11, 10], [12, 13], [13, 4], [14, 3], [15, 3], [16, 6]],
            [[0, 1], [1, 0], [2, 2], [3, 0], [4, 1], [5, 3], [6, 1], [7, 5], [8, 2], [9, 3], [10, 2], [11, 1], [12, 0], [13, 2], [14, 8], [15, 0], [16, 0]]
        ];
        this.flotOptions = {
            series: { splines: { show: true, tension: 0.4, lineWidth: 1, fill: 0.4 }, },
            grid: { tickColor: "#d5d5d5", borderWidth: 1, color: '#d5d5d5' },
            colors: ["#1ab394", "#1C84C6"],
        };
        // Peity chart
        this.peityType1 = "bar";
        this.peityOptions1 = { fill: ["#1ab394", "#d7d7d7"], width: 100 };
        this.peityType2 = "line";
        this.peityOptions2 = { fill: '#1ab394', stroke: '#169c81', width: 64 };
        // Sparkline chart
        this.sparklineData = [5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7];
        this.sparklineOptions = { type: 'bar', barWidth: 8, height: '150px', barColor: '#1ab394', negBarColor: '#c6c6c6' };
    }
    return Dashboard1Component;
}());
Dashboard1Component = __decorate([
    core_1.Component({
        selector: 'dashboard1',
        templateUrl: 'dashboard1.template.html'
    })
], Dashboard1Component);
exports.Dashboard1Component = Dashboard1Component;
//# sourceMappingURL=dashboard1.component.js.map