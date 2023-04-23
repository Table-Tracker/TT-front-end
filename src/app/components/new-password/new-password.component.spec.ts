import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordComponent } from './new-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

class MockAuthenticationService {
  
}

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPasswordComponent ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {queryParams: convertToParamMap({"token": 1, "email": "waowaaowaaowao@gmail.com"})}}
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
