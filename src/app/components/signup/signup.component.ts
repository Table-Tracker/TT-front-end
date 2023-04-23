import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseDTO } from 'src/app/models/dtos/auth-response.dto';
import { UserForSignupDTO } from 'src/app/models/dtos/user-for-signup.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  hide = true;

  hideConfirm = true; 

  signinformgroup: FormGroup = new FormGroup( {
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  signup(signupFormValue) {
    const signup = {... signupFormValue };
    const userForAuth: UserForSignupDTO = {
      firstName: signup.name,
      lastName: signup.surname,
      email: signup.email,
      password: signup.password
    }

    this.authService.signUpUser(userForAuth)
      .subscribe(() => {
        this.authService.loginUser(userForAuth)
          .subscribe({
            next: (response: AuthResponseDTO) => {
              localStorage.setItem("token", response.token);
              localStorage.setItem('userId', `${response.user.id}`);
              
              this.router.navigate(['/home']).then(() => location.reload());
            }
          })
      })
  }
}
