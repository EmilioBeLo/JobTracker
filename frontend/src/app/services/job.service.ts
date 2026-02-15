import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Job {
  id?: number;
  user_id: number;
  company: string;
  position: string;
  status: "Applied" | "Interviewing" | "Offer" | "Rejected";
  applied_date: string;
  notes: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})

export class JobService {
  private http = inject(HttpClient);

  private apiUrl = "http://localhost/dwec/Angular/JobTracker/backend/jobs.php";


  getJobs(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}?user_id=${userId}`)
  }

  createJob(job: Job):Observable<any>{
    return this.http.post(this.apiUrl, job);
  }

  updateJob(job: Job): Observable<any>{
    return this.http.put(this.apiUrl, job);
  }

  deleteJob(jobId: number) : Observable<any>{
    return this.http.delete(this.apiUrl, {body: {id: jobId}})
  }
  
}
