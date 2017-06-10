"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
// App views
var dashboards_module_1 = require("./views/dashboards/dashboards.module");
var appviews_module_1 = require("./views/appviews/appviews.module");
// App modules/components
var layouts_module_1 = require("./components/common/layouts/layouts.module");
var es_demo_component_1 = require("./views/es-demo/es-demo.component");
var resource_manager_ui_component_1 = require("./views/resource-manager-ui/resource-manager-ui.component");
var beam_schedule_component_1 = require("./components/beam-schedule/beam-schedule.component");
var beam_map_component_1 = require("./components/beam-map/beam-map.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            es_demo_component_1.EsDemoComponent,
            resource_manager_ui_component_1.ResourceManagerUiComponent,
            beam_schedule_component_1.BeamScheduleComponent,
            beam_map_component_1.BeamMapComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            dashboards_module_1.DashboardsModule,
            layouts_module_1.LayoutsModule,
            appviews_module_1.AppviewsModule,
            router_1.RouterModule.forRoot(app_routes_1.ROUTES)
        ],
        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map