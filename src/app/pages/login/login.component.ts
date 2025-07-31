import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .loginComGoogle()
      .then(() => {
        console.log('Login bem-sucedido!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Ocorreu um erro no login:', error);
      });
  }
}
