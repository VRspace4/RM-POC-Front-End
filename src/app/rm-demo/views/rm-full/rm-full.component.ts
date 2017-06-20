import {Component, OnInit, Output} from '@angular/core';
import {Allocation} from '../../../es-demo/models/allocation';
import {Originator} from "app/es-demo/models/originator";
import {RootModel} from "../../../es-demo/models/root-model";
import * as deepstream from 'deepstream.io-client-js';
import {DsService} from "../../../services/ds.service";
import {DsGlobals, GeneralGlobals} from "../../../app.globals";
import {Customer} from "../../../es-demo/models/customer";
import {Transponder} from "../../../es-demo/models/transponder";
import {EsEvent} from "../../../es-demo/events/es-event.abstract";
import {ResponseMessage, ResponseMessageType} from "../../../es-demo/types/response-message";
import {RmCommandMutation} from "../../services/rm-command-mutation-library.service";

declare var $: any;
declare var ej: any;
declare var toastr: any;
declare var swal: any;

interface IDataPoint {
  x: string;
  y: number;
  text: string;
};


class DataPoint implements IDataPoint {
  constructor(
    public x: string,
    public y: number,
    public text: string
  ) {}
}

@Component({
  selector: 'app-rm-full',
  templateUrl: './rm-full.component.html',
  styleUrls: ['./rm-full.component.css'],
  providers: [DsService]
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


export class RmFullComponent implements OnInit {
  public rootModel: RootModel;
  public rootModelRecord: deepstreamIO.Record;
  public eventRecord: deepstreamIO.Record;
  public eventRecordFlag = false;
  public selectedTransponderIndex = 0;

  constructor(
    private ds: DsService
  ) {}

  ngOnInit() {
    this.initializeToastr();
    this.initializeListeners();
    this.initializeFormHandler();
    this.renderDonut();
    this.renderSliders();
    this.configureDeepStream();
  }

  initializeToastr() {
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
  }

  initializeListeners() {
    $('#mainAddCustomerBtn').click($.proxy(function() {
      this.resetForms();
      $('#modalTitleCustomer')[0].innerHTML = 'Add Customer';
      $('#modalCustomer').modal('show');
    }, this));

    $('#mainAddTransponderBtn').click($.proxy(function() {
      this.resetForms();
      $('#modalTitleTransponder')[0].innerHTML = 'Add Transponder';
      $('#modalTransponder').modal('show');
    }, this));
  }

  initializeFormHandler() {
    $('#customerForm').validate({
      rules: {
        customerName: {
          required: true
        }
      },
      submitHandler: function(form) {
        const customerName = $('#customerName').val();
        RmCommandMutation.addCustomer(customerName)
          .then((response: ResponseMessage) => {
            if (response.type === ResponseMessageType[ResponseMessageType.success]) {
              swal({
                title: `Customer created`,
                text: `The customer, ${customerName} has been created successfully.`,
                type: "success"
              });
            } else {
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
      submitHandler: function(form) {
        const transponderName = $('#transponderName').val();
        RmCommandMutation.addTransponder(transponderName,
                  $('#transponderPowerLimit').val(),
                  $('#transponderBandwidth').val())
          .then((response: ResponseMessage) => {
            if (response.type === ResponseMessageType[ResponseMessageType.success]) {
              swal({
                title: `Transponder created`,
                text: `The transponder, ${transponderName} has been created successfully.`,
                type: "success"
              });
            } else {
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
  }

  resetForms() {
    $('#customerName').val('');
    $('#transponderName').val('');
    $('#transponderPowerLimit').val('');
    $('#transponderBandwidth').val('');
  }


  renderSliders() {
    $("#rangeSlider").ejSlider({
      sliderType: ej.SliderType.Range,
      values: [30, 60],
      minValue: 0,
      maxValue: 100,
      showScale: true,
    });
  }

  configureDeepStream() {
    // configure rootModelRecordName
    const rootModelRecordName = DsGlobals.rootModelRecordName;
    this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
    this.rootModelRecord.whenReady((record) => {
      this.rootModelRecord.subscribe((rootModel: RootModel) => {
        this.rootModel = rootModel;
        this.updateRootModel(rootModel);
      }, true);
    });

    // configure eventRecordName
    const eventRecordName = DsGlobals.eventRecordName;
    this.eventRecord = this.ds.dsInstance.record.getRecord(eventRecordName);
    this.eventRecord.whenReady((record) => {
      console.log('eventRecord ready!', record);
      this.eventRecord.subscribe((event: EsEvent) => {
        if (this.eventRecordFlag) {
          delete event.rootModel;
          toastr.success('', event.name);
        } else {
          this.eventRecordFlag = true;
        }
      }, true);
    });
  }

  updateRootModel(rootModel: RootModel) {
    let selectedTransponder: Transponder;
    if (rootModel.transponders.length > 0) {
      selectedTransponder = rootModel.transponders[this.selectedTransponderIndex];
      this.updateAllocationChart(selectedTransponder.allocations, selectedTransponder);
      this.updateAllocationTable(selectedTransponder.allocations, selectedTransponder.name,
        rootModel.customers, rootModel.originators);
    }
    this.updateCustomerTable(rootModel.customers);
    this.updateTransponderDropDown(rootModel.transponders);
    this.updateTransponderTable(rootModel.transponders);
    this.updateOriginatorTable(rootModel.originators);
  }

  testFunc() {
    console.log('this is a test');
  }

  rootModelChanged(data: RootModel) {
    console.log('rootModel changed', data);
    // this.updateCustomerTable(data.customers);
    this.testFunc();
  }

  setUiEvents() {
    $("#transponderDropDown").change(function(){
      alert("Hello!");
    });
  }

  updateTransponderDropDown(transponders: Transponder[]) {
    const dropDown = $("#transponderDropDown");

    dropDown.empty();
    transponders.forEach((transponder, index) => {
      dropDown
        .append($('<li>',
          {click: () => {
            this.selectedTransponderIndex = index;
            this.updateRootModel(this.rootModel);
          }})
          .append($('<a>')
            .append(transponder.name)
          )
        );
    });

  }

  updateAllocationChart(allocations: Allocation[], transponder: Transponder) {
    const chart = $("#transponderDonut").ejChart("instance");
    chart.model.title.subTitle.text = transponder.name;
    chart.model.series[0].points = [];
    chart.redraw();

    const emptyString = '';
    const newDataPoints: IDataPoint[] = [];

    if (allocations.length === 0) {
      newDataPoints.push({x: `0 - ${transponder.bandwidth}`, text: emptyString, y: transponder.bandwidth});
    } else {
      allocations.sort((a, b): number => {
        if (a.startFrequency < b.startFrequency) {
          return -1;
        } else if (a.startFrequency > b.startFrequency) {
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
      allocations.forEach((allocation, index) => {
        newDataPoints.push({
          x: allocation.name,
          text: allocation.name,
          y: allocation.stopFrequency - allocation.startFrequency
        });
        if (index === allocations.length - 1) {
          if (allocation.stopFrequency < transponder.bandwidth) {
            newDataPoints.push({
              x: `${allocation.stopFrequency} - ${transponder.bandwidth}`,
              text: emptyString,
              y: transponder.bandwidth - allocation.stopFrequency
            });
          }
        } else if ((allocation.stopFrequency + 1) < allocations[index + 1].startFrequency) {
          newDataPoints.push({
            x: `${allocation.stopFrequency} - ${allocations[index + 1].startFrequency}`,
            text: emptyString,
            y: allocations[index + 1].startFrequency - allocation.stopFrequency
          });
        }
      });
    }

    chart.model.series[0].points = newDataPoints;
    newDataPoints.forEach((newDataPoint, index) => {
      if (newDataPoint.text === emptyString) {
        console.log('Empty!');
        chart.model.series[0].points[index].fill = "#F3F3F4";
      }
    });
    chart.redraw();
  }

  updateAllocationTable(allocations: Allocation[], transponderName: string,
                customers: Customer[], originators: Originator[]) {
    const tbody = $("#tbody-allocations");

    tbody.empty();
    allocations.forEach((allocation) => {
      const matchingCustomer: Customer = customers
        .find((customer: Customer) => customer.id === allocation.customerId);

      const matchingOriginator: Originator = originators
        .find((originator: Originator) => originator.id === allocation.originatorId);

      tbody
        .append($('<tr>')
          .append($('<td>')
            .append(allocation.id)
          )
          .append($('<td>')
            .append(allocation.name)
          )
          .append($('<td>')
            .append(allocation.startFrequency)
          )
          .append($('<td>')
            .append(allocation.stopFrequency)
          )
          .append($('<td>')
            .append(allocation.powerUsage)
          )
          .append($('<td>')
            .append(matchingCustomer.name)
          )
          .append($('<td>')
            .append(matchingOriginator.name)
          )
          .append($('<td>')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-edit fa-lg text-navy'
            }))
            .append('&nbsp;&nbsp;&nbsp;')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-remove fa-lg text-navy'
            }))

          )
        );
    });
  }

  updateTransponderTable(transponders: Transponder[]) {
    const header = $("#allocationsTableHeader");
    if (transponders.length > 0) {
      header[0].innerText = `Allocations for ${transponders[this.selectedTransponderIndex].name}`;
    } else {
      header[0].innerText = `Allocations (No transponder)`;
    };

    const tbody = $("#tbody-transponders");

    tbody.empty();
    transponders.forEach((transponder) => {

      tbody
        .append($('<tr>')
          .append($('<td>')
            .append(transponder.id)
          )
          .append($('<td>')
            .append(transponder.name)
          )
          .append($('<td>')
            .append(transponder.powerLimit)
          )
          .append($('<td>')
            .append(transponder.bandwidth)
          )
          .append($('<td>')
            .append(transponder.allocations.length)
          )
          .append($('<td>')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-edit fa-lg text-navy'
            }))
            .append('&nbsp;&nbsp;&nbsp;')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-remove fa-lg text-navy'
            }))

          )
        );
    });
  }
// <i class="fa fa-check text-navy"></i>
  updateOriginatorTable(originators: Originator[]) {
    const tbody = $("#tbody-originators");

    tbody.empty();
    originators.forEach((originator) => {
      tbody
        .append($('<tr>')
          .append($('<td>')
            .append(originator.id)
          )
          .append($('<td>')
            .append(originator.name)
          )
          .append($('<td>')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-edit fa-lg text-navy'
            }))
            .append('&nbsp;&nbsp;&nbsp;')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-remove fa-lg text-navy'
            }))
          )
        );
    });
  }

  updateCustomerTable(customers: Customer[]) {
    const tbody = $("#tbody-customers");

    tbody.empty();
    customers.forEach((customer) => {
      tbody
        .append($('<tr>')
          .append($('<td>')
            .append(customer.id)
          )
          .append($('<td>')
            .append(customer.name)
          )
          .append($('<td>')
            .append($('<i>', {
              class: 'fa fa-edit fa-lg text-navy'
            }))
            .append('&nbsp;&nbsp;&nbsp;')
            .append($('<i>', {
              // text: 'remove',
              class: 'fa fa-remove fa-lg text-navy',
              click: () => {
                swal({
                  title: "Are you sure?",
                  text: `Are you sure you want to delete the customer, ${customer.name}`,
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "Yes, delete it",
                  closeOnConfirm: false
                }, function () {
                  RmCommandMutation.removeCustomer(customer.id)
                    .then((response: ResponseMessage) => {
                      if (response.type === ResponseMessageType[ResponseMessageType.success]) {
                        swal("Customer deleted", `The customer, ${customer.name}, has been deleted.`, "success");
                      } else {
                        swal({
                          title: response.title,
                          text: response.message,
                          type: "error"
                        });
                      }
                    });
                });

              }
            }))
          )
        );
    });
  }

  renderDonut() {
    const dataPoints = [{ x: 'ABC', y: 53.3, text: "Australia" },
      { x: 'Available', y: null, text: "" },
      { x: 'China', y: 55.7, text: "China" },
      { x: 'India', y: 60.5, text: "India" },
      { x: 'Japan', y: 12.5, text: "Japan" },
      { x: 'South Africa', y: 79.4, text: "South Africa" },
      { x: 'United Kingdom', y: 70.9, text: "United Kingdom" },
      { x: 'United States', y: 45.0, text: "United States" }];
    $(function ()
    {
      $("#transponderDonut").ejChart(
        {
          // Initializing Series
          series:
            [
              {
                points: dataPoints,
                marker:
                  {
                    dataLabel:
                      {
                        visible: true,
                        shape: 'none',
                        connectorLine: { type: 'line', color: 'black' },
                        font: { size: '14px' }
                      }
                  },
                tooltip: { visible: true, format : "#point.x# : #point.y#%" },
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
            subTitle:
              {
                maximumWidth: 50,
                font:
                  {
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
          size: {height: "500"},
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
  }

}
