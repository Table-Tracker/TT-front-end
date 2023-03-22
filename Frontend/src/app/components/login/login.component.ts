import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field'

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDTO } from 'src/app/models/dtos/user-for-authentication.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponseDTO } from 'src/app/models/dtos/auth-response.dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  showError!: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  hide = true;

  loginformgroup: FormGroup = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  loginUser = (loginFormValue) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDTO = {
      email: login.email,
      password: login.password
    }
    this.authService.loginUser(userForAuth)
      .subscribe({
        next: (response: AuthResponseDTO) => {
          if (response.isAuthSuccessful) {
            localStorage.setItem("token", response.token);
            localStorage.setItem('userId', `${response.user.id}`);
            this.router.navigate(['/home']).then(() => location.reload());
          }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Authentication failed. Wrong Username or Password';
        this.showError = true;
      }})
  }

  validateControl = (controlName: string) => {
    return this.loginformgroup.get(controlName)!.invalid && this.loginformgroup.get(controlName)!.touched;
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginformgroup.get(controlName)!.hasError(errorName);
  }

}
