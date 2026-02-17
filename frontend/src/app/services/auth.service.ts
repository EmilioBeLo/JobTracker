import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable
import { Router } from '@angular/router';

export interface User {
    id: number;
    username: string;
    email: string;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost/dwec/Angular/JobTracker/backend/auth.php'; // Adjust path if needed

    private http = inject(HttpClient)
    private router = inject(Router)

    register(user: any): Observable<any> {
        return this.http.post(this.apiUrl, { action: 'register', ...user });
    }

    login(credentials: any): Observable<any> {
        return this.http.post(this.apiUrl, { action: 'login', ...credentials });
    }

    getCurrentUser(): User | null {
        const userData = localStorage.getItem('user')
        if(!userData){
            return null;
        }
        try{
            return JSON.parse(userData) as User
        }catch(error){
            console.error('Error al parsear usuario del localStorage: ', error)
            return null;
        }
    }

    saveUser(user: User):void {
        localStorage.setItem('user', JSON.stringify(user))
    }

    isAuthenticated(): boolean {
        return this.getCurrentUser() !== null
    }

    logout(): void {
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
    }
}
