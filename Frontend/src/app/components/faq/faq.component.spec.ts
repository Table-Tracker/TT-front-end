import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from 'src/app/services/notification.service';
import { FaqComponent } from './faq.component';
import {TextFieldModule} from '@angular/cdk/text-field';
class MockNotificationService{

}

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqComponent],
      providers:[
        {provide: NotificationService, useClass: MockNotificationService},
      ],
      imports:[ TextFieldModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
