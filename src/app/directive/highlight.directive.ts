import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import * as Prism from 'prismjs';



@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    Prism.highlightAllUnder(this.el.nativeElement);
  }

}
