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

    passwordStrength: number = 0;
    strengthLabel: string = '';
    strengthColor: string = 'danger';
    strengthPercent: number = 0;

    get isPasswordStrongEnough(): boolean {
        return this.passwordStrength >= 3;
    }

    constructor(private authService: AuthService, private router: Router) { }

    evaluatePasswordStrength(password: string): void {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        this.passwordStrength = score;

        const levels: { label: string; color: string; percent: number }[] = [
            { label: 'Muy débil', color: 'danger', percent: 10 },
            { label: 'Muy débil', color: 'danger', percent: 20 },
            { label: 'Débil', color: 'warning', percent: 40 },
            { label: 'Media', color: 'info', percent: 60 },
            { label: 'Fuerte', color: 'success', percent: 80 },
            { label: 'Muy fuerte', color: 'success', percent: 100 }
        ];

        const level = levels[score];
        this.strengthLabel = level.label;
        this.strengthColor = level.color;
        this.strengthPercent = level.percent;
    }

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
