import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPageComponent } from './restaurant-page.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ReservationDTO } from 'src/app/models/dtos/reservation.dto';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { TableDTO } from 'src/app/models/dtos/table.dto';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';
class MockRestaurantService {
  getRestaurant(id: number) {
    return of(new HttpResponse<RestaurantDTO>({ status: 200, statusText: 'OK', body: { id: 1 } as RestaurantDTO }));
  }
  
}
class MockBookingService {
}
class MockUserService {
}

describe('RestaurantPageComponent', () => {
  let component: RestaurantPageComponent;
  let fixture: ComponentFixture<RestaurantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantPageComponent ],
      providers: [
        {provide: RestaurantService, useClass: MockRestaurantService},
        {provide: BookingService, useClass: MockBookingService},
        {provide: UserService, useClass: MockUserService},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
