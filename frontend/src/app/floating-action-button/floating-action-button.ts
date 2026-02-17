import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fab',
  imports: [],
  templateUrl: './floating-action-button.html',
  styleUrl: './floating-action-button.css',
})
export class FloatingActionButton {
  @Output() fabClick = new EventEmitter<void>()

  onClick(){
    this.fabClick.emit()
  }
}
