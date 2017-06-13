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
var ds_service_1 = require("../../../services/ds.service");
;
var DataPoint = (function () {
    function DataPoint(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
    }
    return DataPoint;
}());
var RmFullComponent = (function () {
    function RmFullComponent(ds) {
        this.ds = ds;
        var rootModelRecordName = 'rmdemo/rootModel';
        this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
        this.rootModelRecord.whenReady(function (record) {
            console.log('rootModelRecord', record);
        });
        this.rootModelRecord.subscribe(this.rootModelChanged, true);
    }
    RmFullComponent.prototype.rootModelChanged = function (data) {
        console.log('rootModel changed', data);
    };
    RmFullComponent.prototype.ngOnInit = function () {
        this.renderDonut();
    };
    RmFullComponent.prototype.renderDonut = function () {
        var dataPoints = [{ x: 'ABC', y: 53.3, text: "Australia" },
            { x: 'Available', y: null, text: "" },
            { x: 'China', y: 55.7, text: "China" },
            { x: 'India', y: 60.5, text: "India" },
            { x: 'Japan', y: 12.5, text: "Japan" },
            { x: 'South Africa', y: 79.4, text: "South Africa" },
            { x: 'United Kingdom', y: 70.9, text: "United Kingdom" },
            { x: 'United States', y: 45.0, text: "United States" }];
        $(function () {
            $("#transponderDonut").ejChart({
                // Initializing Series
                series: [
                    {
                        points: dataPoints,
                        marker: {
                            dataLabel: {
                                visible: true,
                                shape: 'none',
                                connectorLine: { type: 'line', color: 'black' },
                                font: { size: '14px' }
                            }
                        },
                        tooltip: { visible: true, format: "#point.x# : #point.y#%" },
                        border: { width: 1, color: 'white' },
                        name: 'Agricultural land',
                        type: "doughnut",
                        enableAnimation: true,
                        labelPosition: 'outside',
                        enableSmartLabels: true,
                        explode: true,
                        startAngle: -90,
                        endAngle: 90
                    }
                ],
                title: { text: 'Agricultural land in 2011 (% of land area)' },
                isResponsive: true,
                size: { height: "600" },
                seriesRendering: "seriesRender",
                load: "loadTheme",
                legend: { visible: false, shape: 'circle' },
                // palette: [ "#2F4050", "#F8AC59", "#24C6C8", "#1D84C6","#ED5666"]
                theme: 'flatlight'
            });
        });
        function seriesRender(sender) {
            if (sender.model.theme === "flatdark" || sender.model.theme === "gradientdark") {
                sender.data.series.marker.dataLabel.connectorLine.color = "white";
            }
        }
    };
    return RmFullComponent;
}());
RmFullComponent = __decorate([
    core_1.Component({
        selector: 'app-rm-full',
        templateUrl: './rm-full.component.html',
        styleUrls: ['./rm-full.component.css']
    })
    // function generateDataPoints(rootModel: RootModel, allocat): DataPoint {
    //   const dataPoints: DataPoint[];
    //   const transponder = rootModel.getTransponder()
    //   allocations.forEach((allocation) => {
    //     // Find originator associated with the allocation from the originator array
    //     const originator: Originator = originators.find((originator: Originator) => {
    //       return originator.id === allocation.originatorId;
    //     });
    //     dataPoints.push(new DataPoint(originator.name + ' - ' + allocation.name,
    //     )
    //   });
    //
    //   return dataPoints;
    // };
    ,
    __metadata("design:paramtypes", [ds_service_1.DsService])
], RmFullComponent);
exports.RmFullComponent = RmFullComponent;
//# sourceMappingURL=rm-full.component.js.map