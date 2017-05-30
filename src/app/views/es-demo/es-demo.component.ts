import { Component, OnInit } from '@angular/core';
import { UiUpdaterService } from './services/ui-updater.service';
import { UiGraphService } from './services/ui-graph.service';
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
    UiUpdaterService.initialize();
  }

}
