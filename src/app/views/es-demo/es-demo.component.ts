import { Component, OnInit } from '@angular/core';
import { UiUpdaterService } from './services/ui-updater.service';
import { CatalogApiService } from '../../es-demo/services/catalog-api.service';
import { VisNode } from '../../components/models/vis-node';
import { VisEdge } from '../../components/models/vis-edge';

declare var url: any;
declare var vis: any;

@Component({
  selector: 'app-es-demo',
  templateUrl: './es-demo.component.html',
  styleUrls: ['./es-demo.component.css'],
  providers: [CatalogApiService]
})
export class EsDemoComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    const eventId = localStorage.getItem('eventId');
    if (eventId) {
      UiUpdaterService.setCatalog(35);
    } else {
      console.log('No eventId!');
    }

    // // create an array with nodes
    // //const visNode1 = new VisNode(1, 'JP 1');
    // const visNodes = [new VisNode(1, 'JP 1'), new VisNode(2, 'JP 2')];
    // const nodes = new vis.DataSet(visNodes);
    // // const nodes = new vis.DataSet([
    // //   {id: 1, label: 'Node 1'},
    // //   {id: 2, label: 'Node 2'},
    // //   {id: 3, label: 'Node 3'},
    // //   {id: 4, label: 'Node 4'},
    // //   {id: 5, label: 'Node 5xx'}
    // // ]);
    //
    // // create an array with edges
    // const edges = new vis.DataSet([
    //   {from: 1, to: 3},
    //   {from: 1, to: 2},
    //   {from: 2, to: 4},
    //   {from: 2, to: 5},
    //   {from: 3, to: 3}
    // ]);
    //
    // // create a network
    // const container = document.getElementById('mynetwork');
    // const data = {
    //   nodes: nodes,
    //   edges: edges
    // };
    // const options = {};
    // const network = new vis.Network(container, data, options);
  }

}
