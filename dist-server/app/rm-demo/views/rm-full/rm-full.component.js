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
var app_globals_1 = require("../../../app.globals");
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
        this.selectedTransponderIndex = 0;
    }
    RmFullComponent.prototype.ngOnInit = function () {
        this.renderDonut();
        this.configureDeepStream();
    };
    RmFullComponent.prototype.configureDeepStream = function () {
        var _this = this;
        var rootModelRecordName = app_globals_1.DsGlobals.rootModelRecordName;
        this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
        this.rootModelRecord.whenReady(function (record) {
            console.log('rootModelRecord ready!', record);
            _this.rootModelRecord.subscribe(function (rootModel) {
                var selectedTransponder = rootModel.transponders[_this.selectedTransponderIndex];
                _this.updateCustomerTable(rootModel.customers);
                _this.updateTransponderDropDown(rootModel.transponders);
                _this.updateTransponderTable(rootModel.transponders);
                _this.updateOriginatorTable(rootModel.originators);
                _this.updateAllocationChart(selectedTransponder.allocations, selectedTransponder.name);
            }, true);
        });
    };
    RmFullComponent.prototype.testFunc = function () {
        console.log('this is a test');
    };
    RmFullComponent.prototype.rootModelChanged = function (data) {
        console.log('rootModel changed', data);
        // this.updateCustomerTable(data.customers);
        this.testFunc();
    };
    RmFullComponent.prototype.setUiEvents = function () {
        $("#transponderDropDown").change(function () {
            alert("Hello!");
        });
    };
    RmFullComponent.prototype.updateTransponderDropDown = function (transponders) {
        var dropDown = $("#transponderDropDown");
        dropDown.empty();
        transponders.forEach(function (transponder) {
            dropDown
                .append($('<li>')
                .append($('<a>')
                .append(transponder.name)));
        });
        dropDown.find("li").on("click", "a", function () {
            alert($(this).parent('li').index());
            console.log(dropDown[0].innerText);
        });
    };
    RmFullComponent.prototype.updateAllocationChart = function (allocations, transponderName) {
        var chart = $("#transponderDonut").ejChart("instance");
        //chart.model.title.subtitle.text = transponderName;
    };
    RmFullComponent.prototype.updateTransponderTable = function (transponders) {
        var header = $("#allocationsTableHeader");
        header[0].innerText = "Allocations for " + transponders[this.selectedTransponderIndex].name;
        console.log(header);
        var tbody = $("#tbody-transponders");
        tbody.empty();
        transponders.forEach(function (transponder) {
            tbody
                .append($('<tr>')
                .append($('<td>')
                .append(transponder.id))
                .append($('<td>')
                .append(transponder.name))
                .append($('<td>')
                .append(transponder.powerLimit))
                .append($('<td>')
                .append(transponder.bandwidth))
                .append($('<td>')
                .append(transponder.allocations.length))
                .append($('<td>')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-edit fa-lg text-navy'
            }))
                .append('&nbsp;&nbsp;&nbsp;')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-remove fa-lg text-navy'
            }))));
        });
    };
    // <i class="fa fa-check text-navy"></i>
    RmFullComponent.prototype.updateOriginatorTable = function (originators) {
        var tbody = $("#tbody-originators");
        tbody.empty();
        originators.forEach(function (originator) {
            tbody
                .append($('<tr>')
                .append($('<td>')
                .append(originator.id))
                .append($('<td>')
                .append(originator.name))
                .append($('<td>')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-edit fa-lg text-navy'
            }))
                .append('&nbsp;&nbsp;&nbsp;')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-remove fa-lg text-navy'
            }))));
        });
    };
    RmFullComponent.prototype.updateCustomerTable = function (customers) {
        var tbody = $("#tbody-customers");
        tbody.empty();
        customers.forEach(function (customer) {
            tbody
                .append($('<tr>')
                .append($('<td>')
                .append(customer.id))
                .append($('<td>')
                .append(customer.name))
                .append($('<td>')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-edit fa-lg text-navy'
            }))
                .append('&nbsp;&nbsp;&nbsp;')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-remove fa-lg text-navy'
            }))));
        });
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
                        name: 'Allocations',
                        type: "doughnut",
                        enableAnimation: true,
                        labelPosition: 'outside',
                        enableSmartLabels: true,
                        explode: true,
                        startAngle: -90,
                        endAngle: 90
                    }
                ],
                title: {
                    text: 'Bandwidth Allocations',
                    subTitle: {
                        maximumWidth: 50,
                        font: {
                            opacity: 1,
                            fontfamily: "Segoe UI",
                            fontstyle: 'normal',
                            size: '12px'
                        },
                        textAlignment: 'center',
                        text: "(Transponder 1)",
                    }
                },
                isResponsive: true,
                size: { height: "500" },
                seriesRendering: "seriesRender",
                load: "loadTheme",
                legend: { visible: false, shape: 'circle' },
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
        styleUrls: ['./rm-full.component.css'],
        providers: [ds_service_1.DsService]
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