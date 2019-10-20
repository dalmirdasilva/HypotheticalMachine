import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from '../services/storage.service';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {Position} from '../interfaces/position.interface';

@Directive({
  selector: '[appDragPositionMemory]'
})
export class DragPositionMemoryDirective implements OnInit {

  @Input() private id: string;

  private storageKey: string;
  public position: Position;

  constructor(private element: ElementRef<HTMLElement>,
              private storage: StorageService) {
    this.position = {x: 0, y: 0};
  }

  ngOnInit() {
    this.storageKey = `drag-position-${this.id || 'default'}`;
    this.setInitialPosition();
  }

  @HostListener('cdkDragEnded', ['$event'])
  public onDragEnd(event: CdkDragEnd) {
    this.setNewPosition(event.distance);
  }

  private setInitialPosition(): void {
    const savedPosition = this.storage.getItem(this.storageKey);
    if (savedPosition != null) {
      this.position = savedPosition;
    }
    this.element.nativeElement.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0px)`;
  }

  private setNewPosition(distance: Position) {
    this.position.x += distance.x;
    this.position.y += distance.y;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    this.storage.setItem(this.storageKey, this.position);
  }
}
