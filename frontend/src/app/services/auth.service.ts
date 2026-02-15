import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost/dwec/Angular/JobTracker/backend/auth.php'; // Adjust path if needed

    private http = inject(HttpClient)

    register(user: any): Observable<any> {
        return this.http.post(this.apiUrl, { action: 'register', ...user });
    }

    login(credentials: any): Observable<any> {
        return this.http.post(this.apiUrl, { action: 'login', ...credentials });
    }
}
