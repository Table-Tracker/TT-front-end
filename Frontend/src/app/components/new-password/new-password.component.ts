import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordDTO } from 'src/app/models/dtos/reset-password.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  
  showSuccess!: boolean;
  showError!: boolean;
  errorMessage!: string;
  private token!: string;
  private email!: string;

  hide = true;

  hideConfirm = true; 

  resetPasswordForm: FormGroup = new FormGroup( {
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  
  constructor(private authService: AuthenticationService,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {    
    this.resetPasswordForm.get('confirmPassword')!.setValidators([Validators.required]);
    
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName)!.hasError(errorName)
  }
  public resetPassword = (resetPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const resetPass = { ... resetPasswordFormValue };

    const resetPassDto: ResetPasswordDTO = {
      password: resetPass.password,
      confirmPassword: resetPass.confirmPassword,
      token: this.token,
      email: this.email
    }

    this.authService.resetPassword(resetPassDto)
    .subscribe({
      next:(_) => this.showSuccess = true,
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}
