import { Component, ElementRef, OnInit } from '@angular/core';

declare var L: any;

@Component({
  selector: 'app-beam-map',
  templateUrl: './beam-map.component.html',
  styleUrls: ['./beam-map.component.css']
})
export class BeamMapComponent implements OnInit {

  elementRef: ElementRef;
  constructor(containerElement: ElementRef) {
    this.elementRef = containerElement;
  }

  ngOnInit() {
  }

  createComponent() {
    this.initMap();
  }

  initMap() {
    var beamMap = L.map('dynamicBeamMap').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'light-v9',
      accessToken: 'pk.eyJ1IjoidnJzcGFjZTQiLCJhIjoiY2owYnFkeWo4MDNiNDMzbGNkcDNmeGJseSJ9.kERNJbQVNs5sybmgCGOLwQ'
    }).addTo(beamMap);
  }


}
