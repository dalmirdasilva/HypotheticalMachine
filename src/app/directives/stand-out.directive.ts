import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appStandOut]'
})
export class StandOutDirective {

  private static zIndex = 0;

  constructor(private element: ElementRef<HTMLElement>) {
    this.setZIndex();
  }

  @HostListener('mousedown', ['$event'])
  public mousedownEvent(_: MouseEvent): void {
    this.setZIndex();
  }

  private setZIndex(): void {
    this.element.nativeElement.style.zIndex = (StandOutDirective.zIndex++).toString();
  }
}
