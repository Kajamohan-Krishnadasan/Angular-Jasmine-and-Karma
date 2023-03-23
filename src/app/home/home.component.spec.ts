import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CapitalizePipe } from '../shared/capitalize.pipe';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HighlightDirective } from '../shared/highlight.directive';
import { capitalize } from 'lodash';

const testData = [
  {
    name: 'italian',
    image: 'aaron-burden-3UoB1ftLJjk-unsplash.jpg',
    alt: 'Italian Trulli',
  },
  {
    name: 'sri lanka',
    image: '4k-ultra-hd-motivational-focus-bs4nnk5bt18sgwi4.jpg',
    alt: 'sri lanka',
  },
];

class HomeServiceStub {
  getCities() {
    return Promise.resolve(testData);
  }
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let homeComponent: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, CapitalizePipe, HighlightDirective],
    }).overrideComponent(HomeComponent, {
      set: {
        providers: [
          {
            provide: HomeService,
            useClass: HomeServiceStub,
          },
        ],
      },
    });

    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('is created and data received', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(homeComponent).toBeDefined();
      expect(homeComponent.cities).toBe(testData);
    });
  }));

  it('verify html', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const displayElements = fixture.debugElement.queryAll(By.css('p'));
      displayElements.forEach((element, index) => {
        expect(element.nativeElement.textContent).toContain(
          capitalize(testData[index].name)
        );
      });

      const imageElements = fixture.debugElement.queryAll(By.css('img'));

      imageElements.forEach((element, index) => {
        expect(element.nativeElement.src).toContain(testData[index].image);
        expect(element.nativeElement.alt).toContain(testData[index].alt);
      });
    });
  }));
});
