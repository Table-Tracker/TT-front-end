import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageDTO } from '../models/dtos/image.dto';
import { ManagerDTO } from '../models/dtos/manager.dto';
import { VisitorDTO } from '../models/dtos/visitor.dto';
import { CommandResult } from '../models/enums/command-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': `Bearer ${localStorage['token']}`,
    });
  }

  getVisitor(id: number) {
    return this.http.get<VisitorDTO>(`https://localhost:5001/api/visitors/${id}`, { headers: this.headers });
  }

  updateVisitor(user: VisitorDTO) {
    return this.http.put('https://localhost:5001/api/visitors', user, { headers: this.headers });
  }

  getManager(id: number) {
    return this.http.get<ManagerDTO>(`https://localhost:5001/api/managers/${id}`, { headers: this.headers });
  }

  uploadAvatar(id: number, formData: FormData) {
    let headers = new HttpHeaders({
      'authorization': `Bearer ${localStorage['token']}`,
    });

    return this.http.post<ImageDTO>(`https://localhost:5001/api/visitors/${id}/avatar`, formData, { headers: headers });
  }

  deleteAvatar(id: number) {
    return this.http.delete(`https://localhost:5001/api/visitors/${id}/avatar`, { headers: this.headers });
  }

  addFavourite(visitorId: number, restaurantId: number) {
    return this.http.post<{commandResult: CommandResult; errorMessage: string}>(`https://localhost:5001/api/visitors/${visitorId}/favourites`, null, {
      params: {
        restaurantId: restaurantId
      },
      headers: this.headers
    }
    )
    
  }

  deleteFavourite(visitorId: number, restaurantId: number) {
    return this.http.delete<{commandResult: CommandResult; errorMessage: string}>(`https://localhost:5001/api/visitors/${visitorId}/favourites`, {
      params: {
        restaurantId: restaurantId
      },
      headers: this.headers
    })    
  }
}
