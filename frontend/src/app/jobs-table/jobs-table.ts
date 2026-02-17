import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobFilterPipe } from '../pipes/job-filter.pipe';
import { JobSertPipe } from '../pipes/job-sort.pipe';
import { SearchBar } from '../search-bar/search-bar';
import { SortChange, SortControls } from '../sort-controls/sort-controls';
import { Job, JobService } from '../services/job.service';

@Component({
  selector: 'app-jobs-table',
  imports: [CommonModule, FormsModule, JobFilterPipe, JobSertPipe, SearchBar, SortControls],
  templateUrl: './jobs-table.html',
  styleUrl: './jobs-table.css',
})
export class JobsTable {

  private jobService = inject(JobService)

  @Input() jobs: Job[] = []
  @Input() statusFilter: string = 'All'
  @Output() jobUpdated = new EventEmitter<void>()

  currentSearchTerm: string = ''
  currentSortBy: string = 'date'
  currentSortDirection: 'asc' | 'desc' = 'desc'

  editingJobId: number | null = null

  onSearchChange(term: string){
    this.currentSearchTerm = term
  }

  onSortChange(sort: SortChange){
    this.currentSortBy = sort.field
    this.currentSortDirection = sort.direction
  }

  startEditingStatus(jobId: number){
    this.editingJobId = jobId
  }

  updateJobStatus(job: Job, newStatus: string){
    job.status = newStatus as any

    this.jobService.updateJob(job).subscribe({
      next: (response) => {
        console.log("Estado actualizado correctamente")
        this.editingJobId = null
        this.jobUpdated.emit()
      },
      error: (err) => {
        console.error("Error al actualizar el estado:", err)
        this.editingJobId = null
      }
    })
  }

  cancelEdit(){
    this.editingJobId = null
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'Applied': 'status-applied',
      'Interviewing': 'status-interviewing',
      'Offer': 'status-offer',
      'Rejected': 'status-rejected'
    };
    return classes[status] || '';
  }


}
