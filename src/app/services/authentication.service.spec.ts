import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AuthResponseDTO } from '../models/dtos/auth-response.dto';
import { UserForAuthenticationDTO } from '../models/dtos/user-for-authentication.dto';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { ResetPasswordDTO } from '../models/dtos/reset-password.dto';
import { UserForSignupDTO } from '../models/dtos/user-for-signup.dto';


describe('AuthenticationService', () => {
    let httpTestingController: HttpTestingController;
    let authenticationService: AuthenticationService;
    let jwtHelper: JwtHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ],
          providers: [ AuthenticationService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
            JwtHelperService ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        authenticationService = TestBed.inject(AuthenticationService);
        jwtHelper = TestBed.inject(JwtHelperService);

    });

    describe('#loginUser', () => {
        let email: String;
        let password: String;
        let userForAuthenticationDTO : UserForAuthenticationDTO;
        let expectedAuthResponse: AuthResponseDTO;
    
        beforeEach(() => {
          authenticationService = TestBed.inject(AuthenticationService);
          email = "userl@mail.com";
          password = "usersecret";
          userForAuthenticationDTO = { email, password } as UserForAuthenticationDTO;
          expectedAuthResponse = { isAuthSuccessful: true, errorMessage: "", token: "ABCD-JWT", user: { id: 1 } } as AuthResponseDTO;
        });

        
        it('should return expected auth response', () => {
            authenticationService.loginUser(userForAuthenticationDTO).subscribe({
              next: expectedAuthResponse => expect(expectedAuthResponse)
                .withContext('should return expected auth response')
                .toEqual(expectedAuthResponse),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/accounts/login`);
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(userForAuthenticationDTO);
            req.flush(expectedAuthResponse);
          });
    });


    describe('#sendResetEmail', () => {
        let email: string;
        let expectedResponse: string;
    
        beforeEach(() => {
          authenticationService = TestBed.inject(AuthenticationService);
          email = "userl@mail.com";
          expectedResponse = "We sent you a confirmation email.";
        });

        
        it('should return expected response', () => {
            authenticationService.sendResetEmail(email).subscribe({
              next: expectedResponse => expect(expectedResponse)
                .withContext('should return expected response')
                .toEqual(expectedResponse),
              error: fail
            });
      
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/accounts/reset-password/email`);
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual({email, clientUri: 'http://localhost:4200/new-password'});
            req.flush(expectedResponse);
          });
    });

    describe('#resetPassword', () => {
        let email: String;
        let password: String;
        let confirmPassword: String;
        let token: String;
        let expectedResetResponse: Object;
        let resetPasswordDTO: ResetPasswordDTO;
    
        beforeEach(() => {
          authenticationService = TestBed.inject(AuthenticationService);
          email = "userl@mail.com";
          password = "usersecret";
          confirmPassword = "usersecret"
          token = "ABCD-JWT";
          expectedResetResponse = {success: true};
          resetPasswordDTO = {email, password, confirmPassword, token} as ResetPasswordDTO;
        });

        it('password should be equal to confirmPassword', () => {
            expect(password).toEqual(confirmPassword);
        })
        
        it('should return expected reset response', () => {
            authenticationService.resetPassword(resetPasswordDTO).subscribe({
              next: expectedResetResponse => expect(expectedResetResponse)
                .withContext('should return expected reset response')
                .toEqual(expectedResetResponse),
              error: fail
            });
            
            const req = httpTestingController.expectOne(`https://localhost:5001/api/accounts/reset-password`);
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(resetPasswordDTO);
            req.flush(resetPasswordDTO);
          });
    });

    describe('#signUpUser', () => {
        let firstName: String;
        let lastName: String;
        let email: String;
        let password: String;
        let userForSignupDTO: UserForSignupDTO;
        let expectedAuthResponse: AuthResponseDTO;
    
        beforeEach(() => {
          authenticationService = TestBed.inject(AuthenticationService);
          firstName = "Jack";
          lastName = "Smith";
          email = "userl@mail.com";
          password = "usersecret";
          userForSignupDTO = {firstName, lastName, email, password} as UserForSignupDTO;
          expectedAuthResponse = {isAuthSuccessful: true, errorMessage: "", token: "ABCD-JWT", user: { id: 1 }} as AuthResponseDTO;
          
        });

        
        it('should return expected auth response', () => {
            authenticationService.signUpUser(userForSignupDTO).subscribe({
              next: expectedAuthResponse => expect(expectedAuthResponse)
                .withContext('should return expected auth response')
                .toEqual(expectedAuthResponse),
              error: fail
            });
            
            const req = httpTestingController.expectOne('https://localhost:5001/api/accounts/signup');
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(userForSignupDTO);
            req.flush(userForSignupDTO);
          });
    });

    describe('#logout', () => {
    
        beforeEach(() => {
          localStorage.setItem("token", "xxxxx.yyyyy.zzzzz");
          localStorage.setItem("userId", "1");
        });

        afterEach(() => {
            localStorage.clear();
        });

        it('should clear storage', () => {
            authenticationService.logout();
            expect(localStorage.getItem("token")).toEqual(null);
            expect(localStorage.getItem("userId")).toEqual(null);
        })

    });

    describe('#isAuthenticated', () => {
    
        beforeEach(() => {
          localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
          localStorage.setItem("userId", "1");
        });

        afterEach(() => {
            localStorage.clear();
        });

        it('should be authenticated', () => {
            expect(authenticationService.isAuthenticated()).toEqual(true);
        })

    });

    describe('#isAuthenticated', () => {
    
        beforeEach(() => {
          localStorage.clear();
        });

        it('should be not authenticated', () => {
            expect(authenticationService.isAuthenticated()).toEqual(false);
        })

    });

    describe('#canAccessProfile', () => {
        let profileId: number;

        beforeEach(() => {
            profileId = 1;
            localStorage.clear();
        });

        it('cant access profile', () => {
            expect(authenticationService.canAccessProfile(profileId)).toEqual(false);
        })

    });

    describe('#canAccessProfile', () => {
        let profileId: number;

        beforeEach(() => {
            profileId = 1;
            localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        });

        it('can access profile', () => {
            expect(authenticationService.canAccessProfile(profileId)).toEqual(true);
        })

    });


});