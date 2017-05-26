import { Component, OnInit } from '@angular/core';
import { UiUpdaterService } from './services/ui-updater.service';
import { CatalogApiService } from '../../es-demo/services/catalog-api.service';

declare var url: any;

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
  }

}
