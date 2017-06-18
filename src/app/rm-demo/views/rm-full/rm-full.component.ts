import {Component, OnInit, Output} from '@angular/core';
import {Allocation} from '../../../es-demo/models/allocation';
import {Originator} from "app/es-demo/models/originator";
import {RootModel} from "../../../es-demo/models/root-model";
import * as deepstream from 'deepstream.io-client-js';
import {DsService} from "../../../services/ds.service";
import {DsGlobals} from "../../../app.globals";
import {Customer} from "../../../es-demo/models/customer";
import {Transponder} from "../../../es-demo/models/transponder";


declare var $: any;

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
  public rootModelRecord: deepstreamIO.Record;
  public selectedTransponderIndex = 0;

  constructor(
    private ds: DsService,
  ) {}

  ngOnInit() {
    this.renderDonut();
    this.configureDeepStream();
  }

  configureDeepStream() {
    const rootModelRecordName = DsGlobals.rootModelRecordName;
    this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
    this.rootModelRecord.whenReady((record) => {
      console.log('rootModelRecord ready!', record);
      this.rootModelRecord.subscribe((rootModel: RootModel) => {
        const selectedTransponder = rootModel.transponders[this.selectedTransponderIndex];
        this.updateCustomerTable(rootModel.customers);
        this.updateTransponderDropDown(rootModel.transponders);
        this.updateTransponderTable(rootModel.transponders);
        this.updateOriginatorTable(rootModel.originators);
        this.updateAllocationChart(selectedTransponder.allocations, selectedTransponder.name);
      }, true);
    });
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
    transponders.forEach((transponder) => {
      dropDown
        .append($('<li>')
          .append($('<a>')
            .append(transponder.name))
        );
    });

    dropDown.find("li").on("click", "a", function () {
      alert($(this).parent('li').index());
      console.log(dropDown[0].innerText);
    });
  }

  updateAllocationChart(allocations: Allocation[], transponderName: string) {
    const chart = $("#transponderDonut").ejChart("instance");
    //chart.model.title.subtitle.text = transponderName;
  }

  updateTransponderTable(transponders: Transponder[]) {
    const header = $("#allocationsTableHeader");
    header[0].innerText = `Allocations for ${transponders[this.selectedTransponderIndex].name}`;
    console.log(header);
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

  renderDonut() {
    const dataPoints: IDataPoint[] = [{ x: 'ABC', y: 53.3, text: "Australia" },
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
                maximumWidth:50,
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
