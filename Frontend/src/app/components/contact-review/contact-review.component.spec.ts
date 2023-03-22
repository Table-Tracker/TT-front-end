import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactReviewComponent } from './contact-review.component';

describe('ContactreviewComponent', () => {
  let component: ContactReviewComponent;
  let fixture: ComponentFixture<ContactReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
