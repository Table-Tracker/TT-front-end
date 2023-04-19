import { RestaurantDTO } from './../../models/dtos/restaurant.dto';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
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
