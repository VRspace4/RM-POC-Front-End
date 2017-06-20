"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BeamMapComponent = (function () {
    function BeamMapComponent(containerElement) {
        this.elementRef = containerElement;
    }
    BeamMapComponent.prototype.ngOnInit = function () {
    };
    BeamMapComponent.prototype.createComponent = function () {
        this.initMap();
    };
    BeamMapComponent.prototype.initMap = function () {
        var beamMap = L.map('dynamicBeamMap').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'light-v9',
            accessToken: 'pk.eyJ1IjoidnJzcGFjZTQiLCJhIjoiY2owYnFkeWo4MDNiNDMzbGNkcDNmeGJseSJ9.kERNJbQVNs5sybmgCGOLwQ'
        }).addTo(beamMap);
    };
    return BeamMapComponent;
}());
BeamMapComponent = __decorate([
    core_1.Component({
        selector: 'app-beam-map',
        templateUrl: './beam-map.component.html',
        styleUrls: ['./beam-map.component.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BeamMapComponent);
exports.BeamMapComponent = BeamMapComponent;
//# sourceMappingURL=beam-map.component.js.map