import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'login',
  template: 'Login Component',
})
class LoginComponent {}

@Component({
  selector: 'login',
  template: 'Home Component',
})
class HomeComponent {}

describe('App Component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'home', component: HomeComponent },
          { path: '**', component: LoginComponent },
        ]),
      ],
      declarations: [AppComponent, LoginComponent, HomeComponent],
    });

    fixture = TestBed.createComponent(AppComponent);

    appComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('routes are navigated', fakeAsync(() => {
    expect(appComponent).toBeDefined();

    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);

    router.initialNavigation(); // navigate to login
    tick(); // wait for async

    expect(location.path()).toBe('/login');

    router.navigate(['home']); // navigate to home
    tick(); // wait for async

    expect(location.path()).toBe('/home');
  }));
});
