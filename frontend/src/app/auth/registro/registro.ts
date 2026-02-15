import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: './registro.html',
    styleUrl: './registro.css'
})
export class RegistroComponent {
    user = {
        username: '',
        email: '',
        password: ''
    };
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.authService.register(this.user).subscribe({
            next: (res) => {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.errorMessage = err.error.error || 'Error al registrarse';
            }
        });
    }
}
