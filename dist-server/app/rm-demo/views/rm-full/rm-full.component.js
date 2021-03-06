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
var response_message_1 = require("../../../es-demo/types/response-message");
var rm_command_mutation_library_service_1 = require("../../services/rm-command-mutation-library.service");
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
        this.eventRecordFlag = false;
        this.selectedTransponderIndex = 0;
    }
    RmFullComponent.prototype.ngOnInit = function () {
        this.initializeToastr();
        this.initializeListeners();
        this.initializeFormHandler();
        this.renderDonut();
        this.renderSliders();
        this.configureDeepStream();
    };
    RmFullComponent.prototype.initializeToastr = function () {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "progressBar": true,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "400",
            "hideDuration": "1000",
            "timeOut": "7000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    };
    RmFullComponent.prototype.initializeListeners = function () {
        $('#mainAddCustomerBtn').click($.proxy(function () {
            this.resetForms();
            $('#modalTitleCustomer')[0].innerHTML = 'Add Customer';
            $('#modalCustomer').modal('show');
        }, this));
        $('#mainAddTransponderBtn').click($.proxy(function () {
            this.resetForms();
            $('#modalTitleTransponder')[0].innerHTML = 'Add Transponder';
            $('#modalTransponder').modal('show');
        }, this));
    };
    RmFullComponent.prototype.initializeFormHandler = function () {
        $('#customerForm').validate({
            rules: {
                customerName: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var customerName = $('#customerName').val();
                rm_command_mutation_library_service_1.RmCommandMutation.addCustomer(customerName)
                    .then(function (response) {
                    if (response.type === response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.success]) {
                        swal({
                            title: "Customer created",
                            text: "The customer, " + customerName + " has been created successfully.",
                            type: "success"
                        });
                    }
                    else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: "error"
                        });
                    }
                });
                $('#modalCustomer').modal('hide');
            }
        });
        $('#transponderForm').validate({
            rules: {
                transponderName: {
                    required: true
                },
                transponderPowerLimit: {
                    required: true,
                    min: 0
                },
                transponderBandwidth: {
                    required: true,
                    min: 0
                }
            },
            submitHandler: function (form) {
                var transponderName = $('#transponderName').val();
                rm_command_mutation_library_service_1.RmCommandMutation.addTransponder(transponderName, $('#transponderPowerLimit').val(), $('#transponderBandwidth').val())
                    .then(function (response) {
                    if (response.type === response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.success]) {
                        swal({
                            title: "Transponder created",
                            text: "The transponder, " + transponderName + " has been created successfully.",
                            type: "success"
                        });
                    }
                    else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: "error"
                        });
                    }
                });
                $('#modalTransponder').modal('hide');
            }
        });
    };
    RmFullComponent.prototype.resetForms = function () {
        $('#customerName').val('');
        $('#transponderName').val('');
        $('#transponderPowerLimit').val('');
        $('#transponderBandwidth').val('');
    };
    RmFullComponent.prototype.renderSliders = function () {
        $("#rangeSlider").ejSlider({
            sliderType: ej.SliderType.Range,
            values: [30, 60],
            minValue: 0,
            maxValue: 100,
            showScale: true,
        });
    };
    RmFullComponent.prototype.configureDeepStream = function () {
        var _this = this;
        // configure rootModelRecordName
        var rootModelRecordName = app_globals_1.DsGlobals.rootModelRecordName;
        this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
        this.rootModelRecord.whenReady(function (record) {
            _this.rootModelRecord.subscribe(function (rootModel) {
                _this.rootModel = rootModel;
                _this.updateRootModel(rootModel);
            }, true);
        });
        // configure eventRecordName
        var eventRecordName = app_globals_1.DsGlobals.eventRecordName;
        this.eventRecord = this.ds.dsInstance.record.getRecord(eventRecordName);
        this.eventRecord.whenReady(function (record) {
            console.log('eventRecord ready!', record);
            _this.eventRecord.subscribe(function (event) {
                if (_this.eventRecordFlag) {
                    delete event.rootModel;
                    toastr.success('', event.name);
                }
                else {
                    _this.eventRecordFlag = true;
                }
            }, true);
        });
    };
    RmFullComponent.prototype.updateRootModel = function (rootModel) {
        var selectedTransponder;
        if (rootModel.transponders.length > 0) {
            selectedTransponder = rootModel.transponders[this.selectedTransponderIndex];
            this.updateAllocationChart(selectedTransponder.allocations, selectedTransponder);
            this.updateAllocationTable(selectedTransponder.allocations, selectedTransponder.name, rootModel.customers, rootModel.originators);
        }
        this.updateCustomerTable(rootModel.customers);
        this.updateTransponderDropDown(rootModel.transponders);
        this.updateTransponderTable(rootModel.transponders);
        this.updateOriginatorTable(rootModel.originators);
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
        var _this = this;
        var dropDown = $("#transponderDropDown");
        dropDown.empty();
        transponders.forEach(function (transponder, index) {
            dropDown
                .append($('<li>', { click: function () {
                    _this.selectedTransponderIndex = index;
                    _this.updateRootModel(_this.rootModel);
                } })
                .append($('<a>')
                .append(transponder.name)));
        });
    };
    RmFullComponent.prototype.updateAllocationChart = function (allocations, transponder) {
        var chart = $("#transponderDonut").ejChart("instance");
        chart.model.title.subTitle.text = transponder.name;
        chart.model.series[0].points = [];
        chart.redraw();
        var emptyString = '';
        var newDataPoints = [];
        if (allocations.length === 0) {
            newDataPoints.push({ x: "0 - " + transponder.bandwidth, text: emptyString, y: transponder.bandwidth });
        }
        else {
            allocations.sort(function (a, b) {
                if (a.startFrequency < b.startFrequency) {
                    return -1;
                }
                else if (a.startFrequency > b.startFrequency) {
                    return 1;
                }
                return 0;
            });
            if (allocations[0].startFrequency > 0) {
                newDataPoints.push({
                    x: '0 - ' + allocations[0].startFrequency.toString(),
                    text: emptyString,
                    y: allocations[0].startFrequency
                });
            }
            allocations.forEach(function (allocation, index) {
                newDataPoints.push({
                    x: allocation.name,
                    text: allocation.name,
                    y: allocation.stopFrequency - allocation.startFrequency
                });
                if (index === allocations.length - 1) {
                    if (allocation.stopFrequency < transponder.bandwidth) {
                        newDataPoints.push({
                            x: allocation.stopFrequency + " - " + transponder.bandwidth,
                            text: emptyString,
                            y: transponder.bandwidth - allocation.stopFrequency
                        });
                    }
                }
                else if ((allocation.stopFrequency + 1) < allocations[index + 1].startFrequency) {
                    newDataPoints.push({
                        x: allocation.stopFrequency + " - " + allocations[index + 1].startFrequency,
                        text: emptyString,
                        y: allocations[index + 1].startFrequency - allocation.stopFrequency
                    });
                }
            });
        }
        chart.model.series[0].points = newDataPoints;
        newDataPoints.forEach(function (newDataPoint, index) {
            if (newDataPoint.text === emptyString) {
                console.log('Empty!');
                chart.model.series[0].points[index].fill = "#F3F3F4";
            }
        });
        chart.redraw();
    };
    RmFullComponent.prototype.updateAllocationTable = function (allocations, transponderName, customers, originators) {
        var tbody = $("#tbody-allocations");
        tbody.empty();
        allocations.forEach(function (allocation) {
            var matchingCustomer = customers
                .find(function (customer) { return customer.id === allocation.customerId; });
            var matchingOriginator = originators
                .find(function (originator) { return originator.id === allocation.originatorId; });
            tbody
                .append($('<tr>')
                .append($('<td>')
                .append(allocation.id))
                .append($('<td>')
                .append(allocation.name))
                .append($('<td>')
                .append(allocation.startFrequency))
                .append($('<td>')
                .append(allocation.stopFrequency))
                .append($('<td>')
                .append(allocation.powerUsage))
                .append($('<td>')
                .append(matchingCustomer.name))
                .append($('<td>')
                .append(matchingOriginator.name))
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
    RmFullComponent.prototype.updateTransponderTable = function (transponders) {
        var header = $("#allocationsTableHeader");
        if (transponders.length > 0) {
            header[0].innerText = "Allocations for " + transponders[this.selectedTransponderIndex].name;
        }
        else {
            header[0].innerText = "Allocations (No transponder)";
        }
        ;
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
                class: 'fa fa-edit fa-lg text-navy'
            }))
                .append('&nbsp;&nbsp;&nbsp;')
                .append($('<i>', {
                // text: 'remove',
                class: 'fa fa-remove fa-lg text-navy',
                click: function () {
                    swal({
                        title: "Are you sure?",
                        text: "Are you sure you want to delete the customer, " + customer.name,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it",
                        closeOnConfirm: false
                    }, function () {
                        rm_command_mutation_library_service_1.RmCommandMutation.removeCustomer(customer.id)
                            .then(function (response) {
                            if (response.type === response_message_1.ResponseMessageType[response_message_1.ResponseMessageType.success]) {
                                swal("Customer deleted", "The customer, " + customer.name + ", has been deleted.", "success");
                            }
                            else {
                                swal({
                                    title: response.title,
                                    text: response.message,
                                    type: "error"
                                });
                            }
                        });
                    });
                }
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