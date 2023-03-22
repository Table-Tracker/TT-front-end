import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDTO } from '../models/dtos/reservation.dto';
import { TableDTO } from '../models/dtos/table.dto';
import { CommandResult } from '../models/enums/command-result';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': `Bearer ${localStorage['token']}`,
    });
  }

  getRestaurantTables(id:number) {
    return this.http.get<Array<TableDTO>>(`https://localhost:5001/api/tables/restaurant/${id}`, { headers: this.headers })
  }

  getReservationsForTable(id:number, date: Date) {

    return this.http.get<Array<ReservationDTO>>(`https://localhost:5001/api/tables/${id}/reservations`, {
        params: {
          date: date.toISOString()
        },
        headers: this.headers
      })
  }

  createReservation(reservation: ReservationDTO) {
    return this.http.post<{commandResult: CommandResult;
      errorMessage: string;
      obj: ReservationDTO;}>(`https://localhost:5001/api/reservations`, reservation, { headers: this.headers })

  }

}
