import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { CuisineDTO } from 'src/app/models/dtos/cuisine.dto';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { CuisineService } from 'src/app/services/cuisine.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

class MockCuisineService {
  getAllCuisines() {
    return of(new HttpResponse<CuisineDTO[]>({ status: 200, statusText: 'OK', body: { } as CuisineDTO[] }));
  }
}

class MockRestaurantService {
  getAllRestaurants() {
    return of(new HttpResponse<RestaurantDTO[]>({ status: 200, statusText: 'OK', body: { } as RestaurantDTO[] }));
  }
}


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        {provide: RestaurantService, useClass: MockRestaurantService},
        {provide: CuisineService, useClass: MockCuisineService},
        {
          provide: ActivatedRoute,
          useValue: {queryParams: of({id: 1})}
        }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: SearchComponent}
        ]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
