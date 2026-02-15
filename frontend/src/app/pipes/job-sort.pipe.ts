import { Pipe, PipeTransform } from "@angular/core";
import { Job } from "../services/job.service";



@Pipe({
    name: 'jobSort',
    standalone: true
})
export class JobSertPipe implements PipeTransform{

    transform(jobs: Job[], sortBy: string, sortDirection: 'asc' | 'desc'): Job[] {
        if(!jobs || jobs.length === 0) return [];

        jobs.sort((a, b) => {
            let comparison = 0;
            switch(sortBy){
                case 'company':
                    comparison = a.company.localeCompare(b.company);
                    break;
                
                case 'position':
                    comparison = a.position.localeCompare(b.position)
                    break;

                case 'date':
                    const dateA = new Date(a.applied_date).getTime();
                    const dateB = new Date(b.applied_date).getTime();
                    comparison = dateA - dateB;
                    break;
                
                default:
                    return 0;
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        })
        return  jobs;
    } 
        
}
