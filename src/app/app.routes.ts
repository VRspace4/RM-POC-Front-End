import {Routes} from '@angular/router';

import {Dashboard1Component} from './views/dashboards/dashboard1.component';
import {Dashboard2Component} from './views/dashboards/dashboard2.component';
import {Dashboard3Component} from './views/dashboards/dashboard3.component';
import {Dashboard4Component} from './views/dashboards/dashboard4.component';
import {Dashboard41Component} from './views/dashboards/dashboard41.component';
import {Dashboard5Component} from './views/dashboards/dashboard5.component';

import {StarterViewComponent} from './views/appviews/starterview.component';
import {LoginComponent} from './views/appviews/login.component';

import {BasicLayoutNoTopComponent} from './components/common/layouts/basic-layout-no-top/basic-layout-no-top.component';
import {BlankLayoutComponent} from './components/common/layouts/blankLayout.component';
import {BasicLayoutComponent} from './components/common/layouts/basicLayout.component';
import {TopNavigationLayoutComponent} from './components/common/layouts/topNavigationLayout.component';

import {ResourceManagerUiComponent} from './views/resource-manager-ui/resource-manager-ui.component';
import {EsDemoComponent} from './views/es-demo/es-demo.component';
import {RmFullComponent} from './rm-demo/views/rm-full/rm-full.component';

export const ROUTES: Routes = [
  // Main redirect
  {path: '', redirectTo: 'starterview', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'rmdemo', component: BasicLayoutComponent,
    children: [
      {path: 'rmfull', component: RmFullComponent}
    ]
  },
  // {
  //   path: 'dashboards', component: TopNavigationLayoutComponent,
  //   children: [
  //     {path: 'dashboard41', component: Dashboard41Component}
  //   ]
  // },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'starterview', component: StarterViewComponent}
    ]
  },
  {
    path: '', component: BasicLayoutNoTopComponent,
    children: [
      {path: 'complexui', component: ResourceManagerUiComponent}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'esdemo', component: EsDemoComponent}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },

  // Handle all other routes
  {path: '**',  redirectTo: 'starterview'}
];
