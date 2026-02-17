import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Job, JobService } from '../services/job.service';

@Component({
  selector: 'app-add-job-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job-form.html',
  styleUrl: './add-job-form.css',
})
export class AddJobForm {
  private jobService = inject(JobService)
  @Input() userId: number = 0
  @Input() isVisible: boolean = false
  @Output() close = new EventEmitter<void>()
  @Output() jobCreated = new EventEmitter<Job>()

  newJob: Job  = {
    user_id: 0,
    company: '',
    position: '',
    status: 'Applied',
    applied_date: '',
    notes: ''
  }

  ngOnInit(){
    this.resetForm()
  }

  resetForm(){
    this.newJob = {
      user_id: this.userId,
      company: '',
      position: '',
      status: 'Applied',
      applied_date: new Date().toISOString().split('T')[0],
      notes: ''
    }
  }

  onClose(){
    this.resetForm()
    this.close.emit()
  }

  onSubmit() {
    // Validación
    if (!this.newJob.company || !this.newJob.position) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    // Asegurar que tiene el user_id correcto
    this.newJob.user_id = this.userId;
    
    // Llamar al servicio para crear el job
    this.jobService.createJob(this.newJob).subscribe({
      next: (response) => {
        alert('Oferta añadida correctamente');
        this.resetForm();
        this.jobCreated.emit(); // Notificar al padre que se creó
        this.close.emit(); // Cerrar el modal
      },
      error: (err) => {
        console.error('Error al añadir oferta:', err);
        alert('Error al añadir la oferta de trabajo');
      }
    });
  }

  onOverlayClick(){
    this.onClose()
  }

  onFormClick(event: Event){
    event.stopPropagation()
  }



}

  