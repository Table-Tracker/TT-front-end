import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  confirm() {
    this.authService.sendResetEmail(this.data.email).subscribe({
      next: () => {
        this.data.success();
        this.dialogRef.close();
      },
      error: (err: HttpErrorResponse) => {
        this.data.error();
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
