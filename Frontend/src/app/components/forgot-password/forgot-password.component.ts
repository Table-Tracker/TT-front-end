import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  message: string = '';
  error: boolean = false;

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
  }

  resetpasswordformgroup: FormGroup = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email])
  });

  submit(resetpasswordformgroupvalue) {
    const a = {... resetpasswordformgroupvalue };

    this.service.sendResetEmail(a.email).subscribe({
      next: _response => {
        this.message = 'We sent you a confirmation email.';
        this.error = false;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.message = 'Invalid email!';
          this.error = true;
        } else {
          this.message = 'The server encountered an error!';
          this.error = true;
        }
      }
    });
  }

}
