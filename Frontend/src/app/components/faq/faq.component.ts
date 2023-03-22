import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  whoWeAreOpenState = false;
  doesWeHaveAnOpenState = false;
  freeOpenState = false;
  bookOpenState = false;
  needOpenState = false;

  emailForm: FormGroup = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    question: new FormControl('', Validators.required)
  });

  sendEmail(emailFormValue) {
    const values = {... emailFormValue };
    this.notificationService.sendEmail({
      to: [values.email],
      from: '',
      bcc: [],
      cc: [],
      subject: '',
      body: '',
    }).subscribe(_response => console.log("Your question has been added and will be answered ASAP"));
  }
  
}
