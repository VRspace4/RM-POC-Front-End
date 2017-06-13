import { Component } from '@angular/core';
import {DsService} from "./services/ds.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DsService]
})
export class AppComponent {
}
