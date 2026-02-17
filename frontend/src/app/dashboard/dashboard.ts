import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  JobService,Job } from '../services/job.service';
import { NavbarComponent } from '../navbar/navbar';
import { JobStatsCards } from '../job-stats-cards/job-stats-cards';
import { AddJobForm } from '../add-job-form/add-job-form';
import { JobsTable } from '../jobs-table/jobs-table';
import { FloatingActionButton } from '../floating-action-button/floating-action-button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, 
    AddJobForm, 
    FormsModule, 
    NavbarComponent,
    JobStatsCards, 
    JobsTable,
    FloatingActionButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private jobService = inject(JobService)
  private authService = inject(AuthService)
  private router= inject(Router)

  user: any = null;

  jobs: Job[] = [];

  currentStatusFilter: string = 'All';

  showAddForm = false;

  ngOnInit(){
    const user = this.authService.getCurrentUser()
    if(!user){
      this.router.navigate(['/login'])
      return;
    }
    this.user = user;
    this.loadJobs();
  }


  loadJobs(){
    console.log('User ID:', this.user.id)
      this.jobService.getJobs(this.user.id).subscribe({
        next: (jobs) => {
          this.jobs = jobs;
          
        },
        error: (err) => {
          console.error('Error al cargar ofertas:', err)
          alert('Error al cargar las ofertas de trabajo')
        }
      });
  }

  logout(){
    this.authService.logout()
  }

  toggleAddForm(){
    this.showAddForm = !this.showAddForm;  
  }

 refreshJobs(){
   this.loadJobs()
 }

 onFilterChange(status: string){
   this.currentStatusFilter = status
 }
}
