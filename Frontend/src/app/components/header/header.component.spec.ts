import { VisitorDTO } from './../../models/dtos/visitor.dto';
import {Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

import {Observable, of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';


class MockAuthenticationService {
  public sendResetEmail(email: string) : Observable<any> {
    return of(new HttpResponse( { status: 200, statusText: 'OK' }));
  }
}

class MockUserService {
  updateVisitor(user: VisitorDTO) : Observable<any> {
    return of({ id: 10, generalTrustFactor: 1, fullName: "NAMAE"} as VisitorDTO);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        HeaderComponent,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: UserService, useClass: MockUserService }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: HeaderComponent},
          {path: 'user/:id/profile', component: HeaderComponent},
        ]),
      ]
    })
    .compileComponents();
    component = TestBed.inject(HeaderComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
