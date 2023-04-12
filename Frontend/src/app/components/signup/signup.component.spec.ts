import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

class MockAuthenticationService {
  
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: SignupComponent}
        ]),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
