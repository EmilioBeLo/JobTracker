import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent {
    credentials = {
        email: '',
        password: ''
    };
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                if(response.success){
                    this.authService.saveUser(response.user); 
                    this.router.navigate(['/dashboard'])
                } else {
                    this.errorMessage = response.message || 'Error en el login'
                }
            },
            error: (err) => {
                this.errorMessage = err.error.error || 'Error al iniciar sesión';
            }
        });
    }
}
