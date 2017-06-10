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
var BeamScheduleComponent = (function () {
    function BeamScheduleComponent(containerElement) {
        this.elementRef = containerElement;
    }
    BeamScheduleComponent.prototype.ngOnInit = function () {
    };
    BeamScheduleComponent.prototype.initGraph = function () {
        /** Schedule **/
        var container = this.elementRef.nativeElement; //document.getElementById('visualization');
        var items = [
            { x: '06/11/2014', y: 5, startDate: '06/11/2014', endDate: '06/13/2014', startVal: 320, endVal: 450, group: 0 },
            { x: '06/12/2014', y: 0, startDate: '06/13/2014', endDate: '06/18/2014', startVal: 300, endVal: 370, group: 0 },
            {
                x: '06/13/2014',
                y: 30,
                startDate: '06/13/2014',
                endDate: '06/17/2014 15:25:10:500',
                startVal: 370,
                endVal: 450,
                group: 0
            },
            { x: '06/12/2014', y: 0, startDate: '06/11/2014', endDate: '01/01/2015', startVal: 210, endVal: 230, group: 0 },
            { x: '06/12/2014', y: 0, startDate: '04/06/2014', endDate: '06/16/2014', startVal: 230, endVal: 280, group: 1 },
            { x: '06/12/2014', y: 0, startDate: '06/18/2014', endDate: '06/24/2014', startVal: 300, endVal: 370, group: 1 },
            { x: '06/12/2014', y: 0, startDate: '06/12/2014', endDate: '06/24/2014', startVal: 110, endVal: 210, group: 1 },
            { x: '06/12/2014', y: 0, startDate: '06/01/2014', endDate: '06/12/2014', startVal: 110, endVal: 180, group: 1 },
            { x: '06/12/2014', y: 0, startDate: '05/07/2014', endDate: '06/19/2014', startVal: 450, endVal: 530, group: 2 },
            { x: '06/12/2014', y: 0, startDate: '06/16/2014', endDate: '07/06/2014', startVal: 230, endVal: 300, group: 2 },
            { x: '06/12/2014', y: 0, startDate: '06/17/2014  15:25:10:500', endDate: '06/30/2014', startVal: 370, endVal: 450, group: 2 },
            { x: '06/12/2014', y: 0, startDate: '06/23/2014', endDate: '07/30/2014', startVal: 50, endVal: 110, group: 2 },
            { x: '06/12/2014', y: 0, startDate: '06/07/2014', endDate: '07/23/2014', startVal: 530, endVal: 560, group: 3 },
            { x: '06/12/2014', y: 0, startDate: '06/08/2014', endDate: '08/23/2014', startVal: 560, endVal: 660, group: 3 },
            { x: '06/12/2014', y: 0, startDate: '05/08/2014', endDate: '06/23/2014', startVal: 690, endVal: 740, group: 3 },
            { x: '06/12/2014', y: 0, startDate: '05/08/2014', endDate: '07/23/2014', startVal: 740, endVal: 750, group: 4 }
        ];
        var dataset = new vis.DataSet(items);
        var groupNames = ['Customer-A', 'Customer-B', 'Customer-C', 'Customer-D', 'Customer-E'];
        var groups = new vis.DataSet();
        groups.add({
            id: 0,
            content: groupNames[0]
        });
        groups.add({
            id: 1,
            content: groupNames[1]
        });
        groups.add({
            id: 2,
            content: groupNames[2]
        });
        groups.add({
            id: 3,
            content: groupNames[3]
        });
        groups.add({
            id: 4,
            content: groupNames[4]
        });
        var options = {
            style: 'box',
            barChart: { width: 50, align: 'center' },
            drawPoints: false,
            dataAxis: {
                left: {
                    title: {
                        text: 'Frequency (MHz)'
                    }
                }
            },
            height: '100%',
            graphHeight: '1000px',
            orientation: 'both',
            start: '06/05/2014',
            end: '06/25/2014',
            legend: {
                enabled: true,
                icons: true
            }
        };
        var graph2d = new vis.Graph2d(container, dataset, groups, options);
    };
    return BeamScheduleComponent;
}());
BeamScheduleComponent = __decorate([
    core_1.Component({
        selector: 'app-beam-schedule',
        templateUrl: './beam-schedule.component.html',
        styleUrls: ['./beam-schedule.component.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BeamScheduleComponent);
exports.BeamScheduleComponent = BeamScheduleComponent;
//# sourceMappingURL=beam-schedule.component.js.map