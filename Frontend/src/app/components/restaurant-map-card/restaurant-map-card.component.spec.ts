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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
