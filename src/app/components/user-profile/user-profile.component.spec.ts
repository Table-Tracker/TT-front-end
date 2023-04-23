import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import {Observable, of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';
import { ReservationDTO } from 'src/app/models/dtos/reservation.dto';

class MockUserService {
  getVisitor(id: number) {
    let visitor: VisitorDTO = {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      avatar: {
        id: 1,
        name: "string",
      },
      location: "New York",
      dateOfBirth: new Date(1980, 1, 1),
      generalTrustFactor: 1,
      reservations: [],
      favourites: []
    };
    return of(new HttpResponse<VisitorDTO>( { status: 200, statusText: 'OK', body: visitor as VisitorDTO }));
  }
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({"id": 1})}}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
