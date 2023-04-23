import { AgmInfoWindow } from '@agm/core';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() restaurants!: RestaurantDTO[];
  @Input() address!: string;
  
  restaurantsForMap!: Array<{restaurant: RestaurantDTO, latitude: number, longitude: number}>;

  latitude!: number;
  longitude!: number;

  infoWindowOpened: AgmInfoWindow|null
  previous_info_window: AgmInfoWindow|null

  mapReadyFlag: boolean = false;
  addressReadyFlag: boolean = false;
  
  constructor() {
    this.infoWindowOpened = null;
    this.previous_info_window = null;
    this.restaurantsForMap = [];
  }

  ngOnInit(): void {
  }
  
  public giveLatLong() {

    for (let restaurant of this.restaurants) {
      this.returnLatLong(restaurant.address, (latitude: number, longitude: number) => {
        this.restaurantsForMap.push({
          restaurant,
          latitude,
          longitude,
        });
      });
    }

    let geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ 'address': this.address }, (results, _status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
    });
  }

  public returnLatLong(address: string, callback: Function): void {
    let geocoder = new google.maps.Geocoder();

    let latitude: number = 0;
    let longitude: number = 0;
  
    geocoder.geocode({ 'address': address }, (results, _status) => {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      callback(latitude, longitude);
    });
  }

  icon = {
    url: './assets/location-sign-svgrepo-com.svg',
    scaledSize: {
      width: 40,
      height: 60
    }
  }

  close_window(){
    if (this.previous_info_window != null ) {
      this.previous_info_window.close()
    }
  }

  select_marker(infoWindow){
    if (this.previous_info_window == null)
      this.previous_info_window = infoWindow;
    else {
      this.infoWindowOpened = infoWindow
      this.previous_info_window.close()
    }

    this.previous_info_window = infoWindow
  }

  isNullOrEmpty(value: string | undefined): boolean {
    return !value || value === undefined || value === "" || value.length === 0;
  }

}
