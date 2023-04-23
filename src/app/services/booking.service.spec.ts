import { CuisineDTO } from 'src/app/models/dtos/cuisine.dto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';
import { TableDTO } from '../models/dtos/table.dto';
import { TableState } from '../models/enums/table-state.enum';
import { ReservationDTO } from '../models/dtos/reservation.dto';


describe('BookingService', () => {
    let httpTestingController: HttpTestingController;
    let bookingService: BookingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ],
          providers: [ BookingService ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        bookingService = TestBed.inject(BookingService);
    });

    describe('#getRestaurantTables', () => {
        let expectedRestaurantTables: Array<TableDTO>;
    
        beforeEach(() => {
          bookingService = TestBed.inject(BookingService);
          expectedRestaurantTables = [ { id: 1, number:1, state: TableState.Unoccupied, floor: 1, TableSize: 4 },
                                        { id: 2, number:2, state: TableState.Unoccupied, floor: 2, TableSize: 3 } ] as Array<TableDTO>;
        });
        
        it('should return expected restaurant tables', () => {
            let restaurantId = 1;
            bookingService.getRestaurantTables(restaurantId).subscribe({
              next: restaurantTables => expect(restaurantTables)
                .withContext('should return expected restaurant tables')
                .toEqual(expectedRestaurantTables),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/tables/restaurant/${restaurantId}`);
            expect(req.request.method).toEqual('GET');

            req.flush(expectedRestaurantTables);
          });
    });

    describe('#getReservationsForTable', () => {
        let expectedReservations: Array<ReservationDTO>;
    
        beforeEach(() => {
          bookingService = TestBed.inject(BookingService);
          expectedReservations = [ { id: 1, date: new Date(), 
                                    table: { id: 1, number:1, state: TableState.Unoccupied, floor: 1, TableSize: 4 }} 
                                ] as Array<ReservationDTO>;
        });

        
        it('should return expected reservations for table', () => {
            let tableId = 1;
            let date = new Date();
            bookingService.getReservationsForTable(tableId, date).subscribe({
              next: expectedReservations => expect(expectedReservations)
                .withContext('should return expected reservations for table')
                .toEqual(expectedReservations),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/tables/${tableId}/reservations?date=${date.toISOString()}`);
            expect(req.request.method).toEqual('GET');
            req.flush(expectedReservations);
          });
    });

    describe('#getReservationsForTable', () => {
        let reservation: ReservationDTO;
    
        beforeEach(() => {
          bookingService = TestBed.inject(BookingService);
          reservation = {id: 1, date: new Date(), 
                                    table: { id: 1, number:1, state: TableState.Unoccupied, floor: 1, TableSize: 4 }
                        }  as ReservationDTO;
        });

        it('should be created', () => {
            expect(bookingService).toBeTruthy();
        });
        
        it('should return expected reservation', () => {
            bookingService.createReservation(reservation).subscribe({
              next: reservation => expect(reservation)
                .withContext('should return expected reservation')
                .toEqual(reservation),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/reservations`);
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(reservation)
            req.flush(reservation);
          });
    });

});