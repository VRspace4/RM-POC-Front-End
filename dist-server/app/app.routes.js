"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard1_component_1 = require("./views/dashboards/dashboard1.component");
var dashboard2_component_1 = require("./views/dashboards/dashboard2.component");
var dashboard3_component_1 = require("./views/dashboards/dashboard3.component");
var dashboard4_component_1 = require("./views/dashboards/dashboard4.component");
var dashboard5_component_1 = require("./views/dashboards/dashboard5.component");
var starterview_component_1 = require("./views/appviews/starterview.component");
var login_component_1 = require("./views/appviews/login.component");
var basic_layout_no_top_component_1 = require("./components/common/layouts/basic-layout-no-top/basic-layout-no-top.component");
var blankLayout_component_1 = require("./components/common/layouts/blankLayout.component");
var basicLayout_component_1 = require("./components/common/layouts/basicLayout.component");
var resource_manager_ui_component_1 = require("./views/resource-manager-ui/resource-manager-ui.component");
var es_demo_component_1 = require("./views/es-demo/es-demo.component");
var rm_full_component_1 = require("./rm-demo/views/rm-full/rm-full.component");
exports.ROUTES = [
    // Main redirect
    { path: '', redirectTo: 'starterview', pathMatch: 'full' },
    // App views
    {
        path: 'dashboards', component: basicLayout_component_1.BasicLayoutComponent,
        children: [
            { path: 'dashboard1', component: dashboard1_component_1.Dashboard1Component },
            { path: 'dashboard2', component: dashboard2_component_1.Dashboard2Component },
            { path: 'dashboard3', component: dashboard3_component_1.Dashboard3Component },
            { path: 'dashboard4', component: dashboard4_component_1.Dashboard4Component },
            { path: 'dashboard5', component: dashboard5_component_1.Dashboard5Component }
        ]
    },
    {
        path: 'rmdemo', component: basicLayout_component_1.BasicLayoutComponent,
        children: [
            { path: 'rmfull', component: rm_full_component_1.RmFullComponent }
        ]
    },
    // {
    //   path: 'dashboards', component: TopNavigationLayoutComponent,
    //   children: [
    //     {path: 'dashboard41', component: Dashboard41Component}
    //   ]
    // },
    {
        path: '', component: basicLayout_component_1.BasicLayoutComponent,
        children: [
            { path: 'starterview', component: starterview_component_1.StarterViewComponent }
        ]
    },
    {
        path: '', component: basic_layout_no_top_component_1.BasicLayoutNoTopComponent,
        children: [
            { path: 'complexui', component: resource_manager_ui_component_1.ResourceManagerUiComponent }
        ]
    },
    {
        path: '', component: basicLayout_component_1.BasicLayoutComponent,
        children: [
            { path: 'esdemo', component: es_demo_component_1.EsDemoComponent }
        ]
    },
    {
        path: '', component: blankLayout_component_1.BlankLayoutComponent,
        children: [
            { path: 'login', component: login_component_1.LoginComponent },
        ]
    },
    // Handle all other routes
    { path: '**', redirectTo: 'starterview' }
];
//# sourceMappingURL=app.routes.js.map