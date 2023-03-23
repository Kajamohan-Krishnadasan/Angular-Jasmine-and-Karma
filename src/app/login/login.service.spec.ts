import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('Login Service', () => {
  let loginService: LoginService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  // this is executed before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    loginService = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('service is created', () => {
    expect(loginService).toBeDefined();
  });

  it('login api', () => {
    const testData = true;
    // mock data
    const iputData = {
      username: 'admin',
      password: 'admin',
    };
    loginService.login(iputData).then((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpController.expectOne('login');
    expect(req.request.method).toEqual('POST');

    req.flush(testData); // Respond with mock data
  });

  it('call login() failed', () => {
    const errMsg = 'status 500 error';
    // mock data
    const iputData = {
      username: 'admin',
      password: 'admin',
    };

    // this failure message pass because here we use fail()
    // but this will fail if we use success message
    loginService.login(iputData).then(
      () => fail('should have failed with the 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(errMsg, 'message');
      }
    );
    const req = httpController.expectOne('login');
    expect(req.request.method).toEqual('POST');

    // Respond with mock error
    // fail with 500 error
    req.flush(errMsg, { status: 500, statusText: 'Server Error' }); // this pass because we use fail()

    // success meassage
    // req.flush(errMsg);  // this fail because we use success message and we use fail()
  });
});
