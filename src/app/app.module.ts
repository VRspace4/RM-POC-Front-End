import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { EsDemoComponent } from './views/es-demo/es-demo.component';
import { ResourceManagerUiComponent } from './views/resource-manager-ui/resource-manager-ui.component';
import { BeamScheduleComponent } from './components/beam-schedule/beam-schedule.component';
import { BeamMapComponent } from './components/beam-map/beam-map.component';

@NgModule({
  declarations: [
    AppComponent,
    EsDemoComponent,
    ResourceManagerUiComponent,
    BeamScheduleComponent,
    BeamMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
