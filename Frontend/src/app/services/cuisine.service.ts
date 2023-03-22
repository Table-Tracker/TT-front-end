import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CuisineDTO } from '../models/dtos/cuisine.dto';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': `Bearer ${localStorage['token']}`,
    });
  }

  getAllCuisines() {
    return this.http.get<CuisineDTO[]>('https://localhost:5001/api/cuisines', { headers: this.headers });
  }
}
