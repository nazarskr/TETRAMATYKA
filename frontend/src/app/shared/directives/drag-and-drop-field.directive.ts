import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dragAndDropField]'
})
export class DragAndDropFieldDirective {
  @Output() filesDropped: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.file-over') fileOver: boolean;
  @HostListener('dragover', ['$event']) onDragOver(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }
  @HostListener('drop', ['$event']) onDrop(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer.files;
    this.filesDropped.emit(files);
  }

}
