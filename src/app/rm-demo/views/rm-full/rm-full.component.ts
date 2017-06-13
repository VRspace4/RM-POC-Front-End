import {Component, OnInit, Output} from '@angular/core';
import {Allocation} from '../../../es-demo/models/allocation';
import {Originator} from "app/es-demo/models/originator";
import {RootModel} from "../../../es-demo/models/root-model";
import * as deepstream from 'deepstream.io-client-js';
import {DsService} from "../../../services/ds.service";


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


export class RmFullComponent implements OnInit {
  public rootModelRecord: deepstreamIO.Record;
  constructor(
    private ds: DsService,
  ) {
    const rootModelRecordName = 'rmdemo/rootModel';
    this.rootModelRecord = this.ds.dsInstance.record.getRecord(rootModelRecordName);
    this.rootModelRecord.whenReady((record) => {
      console.log('rootModelRecord', record);
    });
    this.rootModelRecord.subscribe(this.rootModelChanged, true);
  }

  rootModelChanged(data) {
    console.log('rootModel changed', data);
  }

  ngOnInit() {
    this.renderDonut();

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
          size: {height: "600"},
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
  }

}
