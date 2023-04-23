import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';


import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

//import { MockAuthenticationService } from '../../mocks/mocks.module'

class MockAuthenticationService {
  public sendResetEmail(email: string) : Observable<any> {
    return of(new HttpResponse( { status: 200, statusText: 'OK' }));
  }
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let authenticationService : AuthenticationService;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers: [
        ForgotPasswordComponent,
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
    component = TestBed.inject(ForgotPasswordComponent);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error to false after submit', () => {
    component.submit({Password: "placeholder"});
    expect(component.error).toBeFalse()
    expect(component.message).toBe('We sent you a confirmation email.');
  });
});
