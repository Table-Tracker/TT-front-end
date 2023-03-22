import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RestaurantDTO } from '../models/dtos/restaurant.dto';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': `Bearer ${localStorage['token']}`,
    });
  }

  getRestaurant(id: number) {
    return this.http.get<RestaurantDTO>(`https://localhost:5001/api/restaurants/${id}`, { headers: this.headers });
  }

  getAllRestaurants() {
    return this.http.get<RestaurantDTO[]>("https://localhost:5001/api/restaurants", { headers: this.headers });
  }
}
