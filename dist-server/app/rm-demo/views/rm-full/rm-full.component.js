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
//
var RmFullComponent = (function () {
    function RmFullComponent() {
    }
    RmFullComponent.prototype.ngOnInit = function () {
        $(function () {
            $("#container").ejChart({
                // Initializing Series
                series: [
                    {
                        points: [{ x: 'Australia', y: 53.3, text: "Australia" },
                            { x: 'China', y: 55.7, text: "China" },
                            { x: 'India', y: 60.5, text: "India" },
                            { x: 'Japan', y: 12.5, text: "Japan" },
                            { x: 'South Africa', y: 79.4, text: "South Africa" },
                            { x: 'United Kingdom', y: 70.9, text: "United Kingdom" },
                            { x: 'United States', y: 45.0, text: "United States" }],
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
            });
        });
        function seriesRender(sender) {
            if (sender.model.theme === "flatdark" || sender.model.theme == "gradientdark") {
                sender.data.series.marker.dataLabel.connectorLine.color = "white";
            }
        }
        //
        // $('#startAngleSlider').ejSlider(
        //   {
        //     height: 16,
        //     value: -90,
        //     minValue: -360,
        //     maxValue: 360,
        //     incrementStep: 1,
        //     change: "startAngleChange",
        //   });
        //
        // $('#endAngleSlider').ejSlider(
        //   {
        //     height: 16,
        //     value: 90,
        //     minValue: -360,
        //     maxValue: 360,
        //     incrementStep: 1,
        //     change: "endAngleChange",
        //   });
        //
        // $("#optSeriesType").ejDropDownList({ "change": "seriesTypeChanged", width: "110px", selectedItemIndex: 0 });
        //
        // function startAngleChange(args) {
        //   const chart = $("#container").ejChart("instance");
        //   const endAngle = $("#endAngleSlider a").attr("aria-label");
        //   chart.model.series[0].startAngle = parseInt(args.value, 10);
        //   chart.model.series[0].endAngle = parseInt(endAngle, 10);
        //   chart.model.series[0].enableAnimation = false;
        //   chart.redraw();
        // }
        //
        // function endAngleChange(args) {
        //   const chart = $("#container").ejChart("instance");
        //   const startAngle = $("#startAngleSlider a").attr("aria-label");
        //   chart.model.series[0].startAngle = parseInt(startAngle, 10);
        //   chart.model.series[0].endAngle = parseInt(args.value, 10);
        //   chart.model.series[0].enableAnimation = false;
        //   chart.redraw();
        // }
        //
        // function seriesTypeChanged(sender) {
        //   const option = sender.selectedText;
        //   const chart = $("#container").ejChart("instance");
        //   chart.model.series[0].type = option.toLowerCase();
        //   chart.model.series[0].enableAnimation = true;
        //   chart.redraw();
        // }
        // $("#sampleProperties").ejPropertiesPanel();
    };
    return RmFullComponent;
}());
RmFullComponent = __decorate([
    core_1.Component({
        selector: 'app-rm-full',
        templateUrl: './rm-full.component.html',
        styleUrls: ['./rm-full.component.css']
    }),
    __metadata("design:paramtypes", [])
], RmFullComponent);
exports.RmFullComponent = RmFullComponent;
//# sourceMappingURL=rm-full.component.js.map