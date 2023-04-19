import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TableDTO } from '../models/dtos/table.dto';
import { TableState } from '../models/enums/table-state.enum';
import { NotificationService } from './notification.service';
import { EmailDTO } from '../models/dtos/email.dto';


describe('NotificationService', () => {
    let httpTestingController: HttpTestingController;
    let notificationService: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ],
          providers: [ NotificationService ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        notificationService = TestBed.inject(NotificationService);
    });

    describe('#sendEmail', () => {
        let mail: EmailDTO;
        let expectedResponse: String;
    
        beforeEach(() => {
          notificationService = TestBed.inject(NotificationService);
          mail = { from: "from@mail.com", to: ["to@mail.com"], subject: "testSubject", body: "testBody" } as EmailDTO;
        });

        expectedResponse = "Your question has been added and will be answered ASAP";
        
        it('should return expected response', () => {
            notificationService.sendEmail(mail).subscribe({
              next: expectedResponse => expect(expectedResponse)
                .withContext('should return expected response')
                .toEqual(expectedResponse),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/notifications/faq-email`);
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(mail);
            req.flush(expectedResponse);
          });
    });


});