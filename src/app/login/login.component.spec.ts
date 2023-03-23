import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

class Page {
  get submitButton() {
    return this.fixture.nativeElement.querySelector('button');
  }

  get usernameInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#username');
  }

  get passwordInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#pwd');
  }

  get errorMsg() {
    return this.fixture.debugElement.query(By.css('.error')).nativeElement;
  }

  constructor(private fixture: ComponentFixture<LoginComponent>) {}

  public updateValue(input: HTMLInputElement, value: string) {
    input.value = value;

    input.dispatchEvent(new Event('input'));
  }
}

describe('Login Component', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;

  let loginService: LoginService;

  // in login.component.ts we have this.loginService.login();
  let loginServiceSpy: { login: jasmine.Spy };

  // in login.component.ts we have this.router.navigateByUrl('/home');
  let routerSpy: { navigateByUrl: jasmine.Spy };

  let router: Router;
  let page: Page;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj(LoginService, ['login']);
    routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: LoginService,
          useValue: loginServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;

    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    page = new Page(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(loginComponent).toBeDefined();
  });

  it('empty username', () => {
    expect(loginComponent.username).toBe('');

    page.submitButton.click();
    fixture.detectChanges();
    expect(loginComponent.errorMessage).toBe('Please fill all fields');
    expect(page.errorMsg.textContent).toBe(loginComponent.errorMessage);
  });

  it('empty password', () => {
    page.updateValue(page.usernameInput, 'admin');

    expect(loginComponent.username).toBe('admin');
    expect(loginComponent.password).toBe('');

    page.submitButton.click();
    fixture.detectChanges();

    expect(loginComponent.errorMessage).toBe('Please fill all fields');
    expect(page.errorMsg.textContent).toBe(loginComponent.errorMessage);
  });

  it('valid username and password', waitForAsync(() => {
    page.updateValue(page.usernameInput, 'admin');
    page.updateValue(page.passwordInput, 'admin');

    // here we are returning true from login service
    (loginService.login as jasmine.Spy).and.returnValue(Promise.resolve(true));

    page.submitButton.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorArea = debugElement.query(By.css('.error'));
      expect(errorArea).toBeNull();

      const navArgs = (routerSpy.navigateByUrl as jasmine.Spy).calls.first()
        .args[0];

      expect(navArgs).toBe('/home');
    });
  }));

  it('Invalid credentials', fakeAsync(() => {
    page.updateValue(page.usernameInput, 'admin');
    page.updateValue(page.passwordInput, 'sfgfg');

    // here we are returning false from login service
    (loginService.login as jasmine.Spy).and.returnValue(Promise.resolve(false));

    page.submitButton.click();

    tick(); // wait for async call to complete
    fixture.detectChanges();

    expect(loginComponent.errorMessage).toBe('Invalid username or password');
    expect(page.errorMsg.textContent).toBe(loginComponent.errorMessage);
  }));

  it('Login Error', fakeAsync(() => {
    page.updateValue(page.usernameInput, 'admin');
    page.updateValue(page.passwordInput, 'admin');

    (loginService.login as jasmine.Spy).and.rejectWith(
      throwError('Login failed')
    );

    page.submitButton.click();
    tick();

    fixture.detectChanges();
    expect(loginComponent.errorMessage).toBe('Login failed');
    expect(page.errorMsg.textContent).toBe(loginComponent.errorMessage);
  }));
});
