import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  @Input() username: string = '';
  @Output() logoutEvent = new EventEmitter<void>();

  onLogout() {
    this.logoutEvent.emit();
  }
}
