import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchTerm: string = ''

  @Output() search = new EventEmitter<string>()

  onSearchChange(value: string){
    this.searchTerm = value
    this.search.emit(this.searchTerm)
  }

  onClear(){
    this.searchTerm = ''
    this.search.emit('')
  }
}
