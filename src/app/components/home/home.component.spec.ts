import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/restaurant.service';

class MockRestaurantService {
  getAllRestaurants() {
    return of([]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers:[
        {provide: RestaurantService, useClass: MockRestaurantService},
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'search', component: HomeComponent}
        ]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
