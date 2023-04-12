import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProfileComponent } from './manager-profile.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {Observable, of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { ManagerDTO } from './../../models/dtos/manager.dto';

class MockUserService {
  getManager(id: number) {
    return of(new HttpResponse<ManagerDTO>( { status: 200, statusText: 'OK', body: { id: 1 } as ManagerDTO }));
  }
}

describe('ManagerProfileComponent', () => {
  let component: ManagerProfileComponent;
  let fixture: ComponentFixture<ManagerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerProfileComponent ],
      providers:
        [
          { provide: UserService, useClass: MockUserService },
          {
            provide: ActivatedRoute,
            useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}
          }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
