import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/services/user.service';

import {Observable, of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { VisitorDTO } from './../../models/dtos/visitor.dto';

class MockUserService {
  getVisitor(id: number) {
    return of(new HttpResponse<VisitorDTO>( { status: 200, statusText: 'OK', body: { id: 1, generalTrustFactor: 1, fullName: "NAMAE", avatar: { id: 0, name: ''} } as VisitorDTO }));
  }
}

class MockMatDialog {
  
}

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      providers: [
        //{ provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: UserService, useClass: MockUserService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    const cmp = fixture.debugElement.componentInstance;
    cmp.userId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
