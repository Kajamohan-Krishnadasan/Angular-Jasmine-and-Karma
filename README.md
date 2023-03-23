# Angular Jasmine and Karma

## Default Angular CLI README.md

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Jasmine and Karma

### initialize karma config file

- **ng g config karma**
- add bleow code to **karma.conf.js** user **"reporters"** section
  port:9876, // karma web server port
  colors: true, // output color
  logLevel: config.LOG_INFO,  
  autoWatch: true, // atomatic test when new changes are detected
  singleRun: false, // false otherwise karma will exit after running tests

- add below code in under the **test** section in the **angular.json** for enable code coverage
  **"codeCoverage": true**

- beforeEach() : This method is called before each test case. It is used to set up the initial state of the test case.
- afterEach() : This method is called after each test case. It is used to clean up the state of the test case.
- beforeAll() : This method is called before all test cases. It is used to set up the initial state of the test suite.
- afterAll() : This method is called after all test cases. It is used to clean up the state of the test suite.f

### login service test

- HttpClient : this is used to communicate with back-end services
- TestBed : this is used to create an instance of the component

<!--
  it('call login() failed', () => {
    const errMsg = 'status 500 error';

    // mock data
    const iputData = {
      username: 'admin',
      password: 'admin',
    };

    loginService.login(iputData).then(
      // this failure message pass because here we use fail()
      // but this will fail if we use success message
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
    // req.flush(errMsg); // this fail because we use success message and we use fail()

  });
-->

### Home service test

let homeService: HomeService;

- spy on the HttpClient methods
  let httpSpy: { get: jasmine.Spy };

- this is executed before each test
<!--  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        HomeService,
        {
          provide: HttpClient,
          useValue: httpSpy,
        },
      ],
    });

    homeService = TestBed.inject(HomeService);
  });
-->
<!-- 
// test the getCities method
  it('call getCities()', fakeAsync(() => {
    const testData = [
      {
        name: 'trulli',
        image: 'pic_trulli.jpg',
        alt: 'Italian Trulli',
      },
      {
        name: 'chania',
        image: 'img_chania.jpg',
        alt: 'Chania',
      },
    ];

    httpSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));

    homeService.getCities().then((data) =>{
      expect(data).toEqual(testData);
    });

    tick();
  })); 
-->
