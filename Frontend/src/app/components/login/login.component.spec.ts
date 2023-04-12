import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuthenticationService {
  public sendResetEmail(email: string) : Observable<any> {
    return of(new HttpResponse( { status: 200, statusText: 'OK' }));
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthenticationService, useClass: MockAuthenticationService}
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: LoginComponent}
        ]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
