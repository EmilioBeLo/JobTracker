import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../services/job.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-job-stats-cards',
  imports: [CommonModule],
  templateUrl: './job-stats-cards.html',
  styleUrl: './job-stats-cards.css',
})
export class JobStatsCards {
  @Input() jobs: Job[] = [];
  activeFilter: string = 'All';
  @Output() filterChange = new EventEmitter<string>();

  get statsCards(){
    const totalJobs = this.jobs.length;
    const appliedCount = this.jobs.filter(j => j.status === 'Applied').length;
    const interviewingCount = this.jobs.filter(j => j.status === 'Interviewing').length
    const offerCount = this.jobs.filter(j => j.status === 'Offer').length;
    const rejectedCount = this.jobs.filter(j => j.status === 'Rejected').length;

    return [
      { label: 'Total', count: totalJobs, status: 'All', colorClass: '' },
      { label: 'Applied', count: appliedCount, status: 'Applied', colorClass: 'stat-applied' },
      { label: 'Interviewing', count: interviewingCount, status: 'Interviewing', colorClass: 'stat-interviewing' },
      { label: 'Offer', count: offerCount, status: 'Offer', colorClass: 'stat-offer' },
      { label: 'Rejected', count: rejectedCount, status: 'Rejected', colorClass: 'stat-rejected' }
    ]

  }

  onCardClick(status: string){
    this.activeFilter = status
    this.filterChange.emit(status)
  }

}
