import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'rgb(211, 211, 211)'; // lightgray

  @Input('appHighlight') bgcolor: string = '';

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.customProperty = true;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor =
      this.bgcolor || this.defaultColor;
  }
}
