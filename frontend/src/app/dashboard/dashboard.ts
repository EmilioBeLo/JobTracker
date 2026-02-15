import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  JobService,Job } from '../services/job.service';
import { JobFilterPipe } from '../pipes/job-filter.pipe';
import { JobSertPipe } from '../pipes/job-sort.pipe';
import { NavbarComponent } from '../navbar/navbar';
import { JobStatsCards } from '../job-stats-cards/job-stats-cards';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, JobFilterPipe, JobSertPipe, NavbarComponent,JobStatsCards],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  private jobService = inject(JobService)
  private router= inject(Router)

  user: any = null;

  jobs: Job[] = [];

  statusFilter = 'All';
  searchTerm = '';

  sortBy: string = 'date'
  sortDirection: 'asc' | 'desc' = 'desc'

  editingJobId: number|null=null;

  showAddForm = false;
  newJob: Job = {
    user_id: 0,
    company: '',
    position: '',
    status: 'Applied',
    applied_date: '',
    notes: '' 
  }

  ngOnInit(){
    const userData = localStorage.getItem('user')
    if(!userData){
      this.router.navigate(['/login'])
      return;
    }

    this.user = JSON.parse(userData);
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

  filterByStatus(status: string){
    this.statusFilter = status;
  }

  changeSorting(field: string){
    if(this.sortBy === field){
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }else{
      this.sortBy=field;
      this.sortDirection = 'asc';
    }
  }

  clearSearch(){
    this.searchTerm = '';
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
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

  toggleAddForm(){
    this.showAddForm = !this.showAddForm;
    if(this.showAddForm){
      this.resetForm();
    }
  }

  resetForm(){
    this.newJob = {
      user_id: this.user.id,
      company: '',
      position: '',
      status: 'Applied',
      applied_date: new Date().toISOString().split('T')[0],
      notes: ''
    }
  }

  addJob(){
    if(!this.newJob.company || !this.newJob.position){
      alert('Por favor completa los campos obligatorios')
      return;
    }

    this.newJob.user_id = this.user.id;
    this.jobService.createJob(this.newJob).subscribe({
      next:(response) => {
        alert('Oferta añadida correctamente')
        this.showAddForm = false;
        this.loadJobs()
      },
      error:(err)=>{
        console.error('Error al añadir oferta:', err)
        alert('Error al añadir la oferta de trabajo')
      }
    })
  }

  startEditingStatus(jobId: number){
    this.editingJobId = jobId;
  }

  updateJobStatus(job: Job, newStatus: string){
    job.status = newStatus as any

    this.jobService.updateJob(job).subscribe({
      next:(response) => {
        console.log("Estado actualizado correctamente")
        this.editingJobId = null
        this.loadJobs()
      },
      error:(err) =>{
        console.error('Error al actualizar estado:', err);
        alert('Error al actualizar el estado de la oferta')
        this.editingJobId = null
      }
    })
  }

  cancelEdit(){
    this.editingJobId = null;
  }

  
}
