
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError } from 'rxjs/operators';

import { LocationService } from '../services/location.service';

@Component({
  selector: 'mapmap',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    disableDefaultUI: false,
    fullscreenControl: true,
    mapTypeControl: true,
    zoom: 9,
    center: {
      lat: 53.286805,
      lng: 9.866817
    }
  }

  maoptions: google.maps.MarkerOptions = {
    draggable: false
  }
  maarr: google.maps.LatLngLiteral[] = [];

  addMarker(lalo: any) {
    this.maarr.push(lalo);
  }

  addhm(): void {
    let lalo = {
      lat: 53.286805,
      lng: 9.866817
    }
    this.addMarker(lalo)
  }
  addsomecoord(): void {
    let lalo = {
      lat: 53.286805,
      lng: 10.226817
    }
    this.addMarker(lalo);
  }
  rdmap(): void {
    this.options = {
      mapTypeId: 'roadmap',
      center: {
        lat: 53.286805,
        lng: 9.866817
      },
      zoom: 9
    }
  }
  hymap(): void {

    this.options = {
      center: {
        lat: 53.286805,
        lng: 9.866817
      },
      mapTypeId: 'hybrid',
      zoom: 9
    }
  }

  constructor(httpClient: HttpClient, locationService: LocationService) {

    locationService.getPosition().then(pos => {
      this.options.center = {
        lat: pos.lat,
        lng: pos.lng
      }
      let lalo = {
        lat: 53.550805,               //when billing is enabled this Marker in Hamburg needs to be changed to the detected position: "lat: pos.lat, lng: pos.lng"
        lng: 9.966817
      }

      this.addMarker(lalo);
    });

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDs9GIoOLPa1MIqHN53-lA0zu81ac0Gwtc', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {

  }

}