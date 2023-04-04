import { ManagerState } from './../models/enums/manager-state.enum';
import { ManagerDTO } from 'src/app/models/dtos/manager.dto';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
    let httpTestingController: HttpTestingController;
    //let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          // Import the HttpClient mocking services
          imports: [ HttpClientTestingModule ],
          // Provide the service-under-test
          providers: [ UserService ]
        });
    
        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpTestingController = TestBed.inject(HttpTestingController);
        userService = TestBed.inject(UserService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
    describe('#getVisitor', () => {
        let expectedVisitor: VisitorDTO;
    
        beforeEach(() => {
          userService = TestBed.inject(UserService);
          expectedVisitor = { id: 1, generalTrustFactor: 1, fullName: "NAMAE"} as VisitorDTO;
        });
        
        it('should return expected visitor', () => {
            let visitorId = 1;
            userService.getVisitor(visitorId).subscribe({
              next: visitor => expect(visitor)
                .withContext('should return expected visitor')
                .toEqual(expectedVisitor),
              error: fail
            });
      
            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne(`https://localhost:5001/api/visitors/1`);
            expect(req.request.method).toEqual('GET');
      
            // Respond with the mock heroes
            req.flush(expectedVisitor);
          });
    });

    describe('#updateVisitor', () => {
        it('should update a visitor and return it', () => {

            let updateVisitor: VisitorDTO;
            updateVisitor = { id: 1, generalTrustFactor: 1, fullName: "NAMAE"} as VisitorDTO;
      
            userService.updateVisitor(updateVisitor).subscribe({
              next: data => expect(data)
                .withContext('should return the visitor')
                .toEqual(updateVisitor),
              error: fail
            });
      
            // HeroService should have made one request to PUT hero
            const req = httpTestingController.expectOne("https://localhost:5001/api/visitors");
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(updateVisitor);
      
            // Expect server to return the hero after PUT
            const expectedResponse = new HttpResponse( { status: 200, statusText: 'OK', body: updateVisitor });
            req.event(expectedResponse);
          });
    });

    describe('#getManager', () => {
        let expectedManager: ManagerDTO;
        expectedManager = { id: 1, managerState: ManagerState.Occupied, fullName: "NAMAE"} as ManagerDTO;
        
        it('should return expected visitor', () => {
            let managerId = 1;
            userService.getManager(managerId).subscribe({
              next: manager => expect(manager)
                .withContext('should return expected visitor')
                .toEqual(expectedManager),
              error: fail
            });
      
            // HeroService should have made one request to GET heroes from expected URL
            const req = httpTestingController.expectOne(`https://localhost:5001/api/managers/1`);
            expect(req.request.method).toEqual('GET');
      
            // Respond with the mock heroes
            req.flush(expectedManager);
          });
    });
    // beforeEach(() => {
    //     // TODO: spy on other methods too
    //     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    //     userService = new UserService(httpClientSpy);
    // });

    // it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    //     const expectedHeroes: Hero[] =
    //     [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

    //     httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

    //     heroService.getHeroes().subscribe({
    //     next: heroes => {
    //         expect(heroes)
    //         .withContext('expected heroes')
    //         .toEqual(expectedHeroes);
    //         done();
    //     },
    //     error: done.fail
    //     });
    //     expect(httpClientSpy.get.calls.count())
    //     .withContext('one call')
    //     .toBe(1);
    // });

    // it('should return an error when the server returns a 404', (done: DoneFn) => {
    //     const errorResponse = new HttpErrorResponse({
    //     error: 'test 404 error',
    //     status: 404, statusText: 'Not Found'
    //     });

    //     httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    //     heroService.getHeroes().subscribe({
    //     next: heroes => done.fail('expected an error, not heroes'),
    //     error: error  => {
    //         expect(error.message).toContain('test 404 error');
    //         done();
    //     }
    //     });
    // });
});