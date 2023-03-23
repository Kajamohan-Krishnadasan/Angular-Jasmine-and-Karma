import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<h2 appHighlight="yellow">Somethig Yellow</h2>
    <h2 appHighlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [appHighlight]="box.value" value="cyan" />`,
})
class TestComponent {}

let fixture: ComponentFixture<TestComponent>;
let des: DebugElement[];
let bareH2: DebugElement;

describe('Highlight Directive', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    bareH2 = fixture.debugElement.query(By.css('h2:not([appHighlight])'));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('check 1st h2 background color is Yellow', () => {
    const dir = des[0].injector.get(HighlightDirective) as HighlightDirective;
    expect(dir.bgcolor).toBe('yellow');
  });

  it('check 2nd h2 background color is defacult(Gray)', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgcolor = des[1].nativeElement.style.backgroundColor;
    expect(bgcolor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color',()=>{
    const input = des[2].nativeElement as HTMLInputElement;

    expect(input.style.backgroundColor).toBe('cyan','initial backgroundColor');

    input.value = 'green';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green','changed backgroundColor');
  });


  it('bare h2 element not have a customProperty',()=>{
    expect(bareH2.properties['customProperty']).toBeUndefined();
  })
});
