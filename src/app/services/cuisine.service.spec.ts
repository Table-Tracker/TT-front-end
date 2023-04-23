import { CuisineDTO } from 'src/app/models/dtos/cuisine.dto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CuisineService } from './cuisine.service';

describe('CuisineService', () => {
    let httpTestingController: HttpTestingController;
    let cuisineService: CuisineService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ],
          providers: [ CuisineService ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        cuisineService = TestBed.inject(CuisineService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#getAllCuisines', () => {
        let expectedCuisines: CuisineDTO[];
    
        beforeEach(() => {
          cuisineService = TestBed.inject(CuisineService);
          expectedCuisines = [{ id: 1, cuisine: "someTastyCuisine"}, { id: 2, cuisine: "notSoTastyCuisine"} ] as CuisineDTO[];
        });

        
        it('should return expected cuisines', () => {
            cuisineService.getAllCuisines().subscribe({
              next: cuisines => expect(cuisines)
                .withContext('should return expected cuisines')
                .toEqual(expectedCuisines),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne('https://localhost:5001/api/cuisines');
            expect(req.request.method).toEqual('GET');

            req.flush(expectedCuisines);
          });
    });

});