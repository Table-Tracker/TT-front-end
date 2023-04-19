import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponseDTO } from '../models/dtos/auth-response.dto';
import { ResetPasswordDTO } from '../models/dtos/reset-password.dto';
import { UserForAuthenticationDTO } from '../models/dtos/user-for-authentication.dto';
import { UserForSignupDTO } from '../models/dtos/user-for-signup.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headers: HttpHeaders;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'authorization': `Bearer ${localStorage['token']}`,
    });
  }

  public loginUser = (body: UserForAuthenticationDTO) => {
    return this.http.post<AuthResponseDTO>('https://localhost:5001/api/accounts/login', body);
  }

  public sendResetEmail = (email: string) => {
    return this.http.post(
      'https://localhost:5001/api/accounts/reset-password/email',
    { email: email, clientUri: 'http://localhost:4200/new-password' },
    { headers: this.headers });
  }

  public resetPassword = (body: ResetPasswordDTO) => {
    return this.http.post('https://localhost:5001/api/accounts/reset-password', body, { headers: this.headers });
  }

  public signUpUser = (body: UserForSignupDTO) => {
    return this.http.post('https://localhost:5001/api/accounts/signup', body, { headers: this.headers });
  }

  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token === null) {
      return false;
    }
    
    return !this.jwtHelper.isTokenExpired(token!);
  }

  public canAccessProfile(id: number): boolean {
    return this.isAuthenticated() && true;
  }
}
