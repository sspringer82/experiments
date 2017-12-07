import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[ngDraggable]',
})
export class NgDraggableDirective {
  private dndEl;
  private el;
  private target;
  private spacer;
  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
    this.spacer = this.renderer.createElement('div');
    this.spacer.classList.add('spacer');
  }

  @Output() public move = new EventEmitter();
  @HostListener('dragstart', ['$event'])
  onDragStart(dragEvent) {
    console.log('dragStart');
    this.dndEl = dragEvent.target;
  }

  @HostListener('dragover', ['$event'])
  onDragOver(dragEvent) {
    this.target = dragEvent.target;
    if (this.target && this.target !== this.dndEl && this.target.draggable) {
      this.el.insertBefore(this.spacer, this.target || this.target.nextSibling);
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(dragEvent) {
    this.el.removeChild(this.spacer);
    if (this.target) {
      this.el.insertBefore(this.dndEl, this.target);
      this.move.emit(
        JSON.stringify({
          el: this.dndEl.getAttribute('data-key'),
          before: this.target.getAttribute('data-key'),
        }),
      );
    }
  }
}
