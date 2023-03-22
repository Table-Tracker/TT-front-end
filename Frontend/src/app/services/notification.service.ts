import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailDTO } from '../models/dtos/email.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': `Bearer ${localStorage['token']}`,
    });
  }

  public sendEmail = (email: EmailDTO) => {
    return this.http.post('https://localhost:5001/api/notifications/faq-email', email, { headers: this.headers });
  }
}
