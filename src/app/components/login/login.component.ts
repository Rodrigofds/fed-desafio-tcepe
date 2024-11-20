import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signin(this.username, this.password).subscribe(
      response => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Erro ao fazer login', error);
      }
    );
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
