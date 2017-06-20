"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var dashboard1_component_1 = require("./dashboard1.component");
var dashboard2_component_1 = require("./dashboard2.component");
var dashboard3_component_1 = require("./dashboard3.component");
var dashboard4_component_1 = require("./dashboard4.component");
var dashboard41_component_1 = require("./dashboard41.component");
var dashboard5_component_1 = require("./dashboard5.component");
// Chart.js Angular 2 Directive by Valor Software (npm)
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var flotChart_1 = require("../../components/charts/flotChart");
var iboxtools_module_1 = require("../../components/common/iboxtools/iboxtools.module");
var peity_1 = require("../../components/charts/peity");
var sparkline_1 = require("../../components/charts/sparkline");
var jvectorMap_1 = require("../../components/map/jvectorMap");
var DashboardsModule = (function () {
    function DashboardsModule() {
    }
    return DashboardsModule;
}());
DashboardsModule = __decorate([
    core_1.NgModule({
        declarations: [dashboard1_component_1.Dashboard1Component, dashboard2_component_1.Dashboard2Component, dashboard3_component_1.Dashboard3Component, dashboard4_component_1.Dashboard4Component, dashboard41_component_1.Dashboard41Component, dashboard5_component_1.Dashboard5Component],
        imports: [platform_browser_1.BrowserModule, ng2_charts_1.ChartsModule, flotChart_1.FlotModule, iboxtools_module_1.IboxtoolsModule, peity_1.PeityModule, sparkline_1.SparklineModule, jvectorMap_1.JVectorMapModule],
        exports: [dashboard1_component_1.Dashboard1Component, dashboard2_component_1.Dashboard2Component, dashboard3_component_1.Dashboard3Component, dashboard4_component_1.Dashboard4Component, dashboard41_component_1.Dashboard41Component, dashboard5_component_1.Dashboard5Component],
    })
], DashboardsModule);
exports.DashboardsModule = DashboardsModule;
//# sourceMappingURL=dashboards.module.js.map