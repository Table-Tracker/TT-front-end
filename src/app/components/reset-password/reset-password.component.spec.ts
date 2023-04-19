import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

class MockResetPasswordComponent {
  // mock implementation of component methods
  confirm() {}
  cancel() {}
}
class MockAuthenticationService {
}

describe('ReserpasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      providers:[
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ResetPasswordComponent, useClass: MockResetPasswordComponent },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { email: 'test@example.com', success: () => {}, error: () => {} } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
