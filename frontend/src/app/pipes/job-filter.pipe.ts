import { Pipe, PipeTransform } from "@angular/core";
import { Job } from "../services/job.service";



@Pipe({
    name: 'jobFilter',
    standalone: true
})

export class JobFilterPipe implements PipeTransform {
    transform(jobs: Job[], statusFilter: string, searchTerm: string): Job[]{
        if(!jobs) return [];

        return jobs.filter(job => {
            // Filtro por estado
            const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

            // Filtro por búsqueda
            const matchesSearch = 
                job.company.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                job.position.toLowerCase().includes(searchTerm.trim().toLowerCase());

            return matchesStatus && matchesSearch;
        })
    }
}