import { RestaurantDTO } from './../../models/dtos/restaurant.dto';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2, Type } from '@angular/core';

import { ContactReviewComponent } from './contact-review.component';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

describe('ContactreviewComponent', () => {
  let component: ContactReviewComponent;
  let fixture: ComponentFixture<ContactReviewComponent>;
  let renderer2: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactReviewComponent, MatButtonToggleGroup ],
      providers: [Renderer2],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactReviewComponent);
    component = fixture.componentInstance;
    component.restaurant = { id: 1, address: 'here' } as RestaurantDTO;
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    spyOn(renderer2, 'addClass').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
