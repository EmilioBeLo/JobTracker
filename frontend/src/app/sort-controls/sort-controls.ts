import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';


export interface SortChange{
  field: string
  direction: 'asc' | 'desc'
}

@Component({
  selector: 'app-sort-controls',
  imports: [CommonModule],
  templateUrl: './sort-controls.html',
  styleUrl: './sort-controls.css',
})


export class SortControls {
  sortBy: string = 'date'
  sortDirection: 'asc' | 'desc' = 'desc'

  @Output() sortChange = new EventEmitter<SortChange>()

  changeSorting(field: string){
    if(this.sortBy === field){
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    }else{
      this.sortBy = field
      this.sortDirection = 'asc'
    }
    this.sortChange.emit({
      field: this.sortBy,
      direction: this.sortDirection
    })
  }
}
