import { Component, OnInit } from '@angular/core';
declare const L: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('Location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coord = position.coords;
      const LatLon = [coord.latitude, coord.longitude];
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      let mymap = L.map('map').setView(LatLon, 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9rZXlkYW5naSIsImEiOiJja2I4OWducDUwMjJiMnpwaTM0OXFvN3ZxIn0.2A8La7bzoAHEWvLoEBICUQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
      let marker = L.marker(LatLon).addTo(mymap);
      marker.bindPopup('<p>Hi</>').openPopup();
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLons = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
      if (position.coords.latitude === desLat) {
        navigator.geolocation.clearWatch(id);
      }
     }, (err) => {
       console.log(err);
     }, {
       enableHighAccuracy: false,
       timeout: 5000,
       maximumAge: 0
     });
  }
}
