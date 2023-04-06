import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMapCardComponent } from './restaurant-map-card.component';

describe('RestaurantMapCardComponent', () => {
  let component: RestaurantMapCardComponent;
  let fixture: ComponentFixture<RestaurantMapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMapCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMapCardComponent);
    component = fixture.componentInstance;
    component.restaurant = {
      id: 1,
      name: "string",
      description: "string",
      rating: 0,
      priceRange: 0,
      numberOfTables: 0,
      type: 0,
      discount: 0,
      mainImage: {
        id: 1,
        name: "string",
      },
      cuisines: [],
      dateOfOpening: new Date(),
      address: "string",
      email: "string",
      phone: "string",
      website: "string",
      menu: "string",
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
