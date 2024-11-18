import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  searchQuery: string = '';
  users = [
    {
      id: 1,
      name: 'João Silva',
      cars: [
        { year: 2020, model: 'Honda', plate: 'ABC-1B23' },
        { year: 2021, model: 'Corolla', plate: 'BCD-2C34' },
        { year: 2020, model: 'Honda', plate: 'ABC-1B23' },
        { year: 2021, model: 'Corolla', plate: 'BCD-2C34' }
      ]
    },
    {
      id: 2,
      name: 'Maria Santos',
      cars: [
        { year: 2019, model: 'Onix', plate: 'ZXC-0E98' }
      ]
    },
    {
      id: 3,
      name: 'Maria João Silva',
      cars: [
        { year: 2020, model: 'Honda', plate: 'ABC-1B23' },
        { year: 2021, model: 'Corolla', plate: 'BCD-2C34' }
      ]
    },
    {
      id: 4,
      name: 'João Maria Silva',
      cars: [
        { year: 2020, model: 'Honda', plate: 'ABC-1B23' },
        { year: 2021, model: 'Corolla', plate: 'BCD-2C34' }
      ]
    }
  ];

  onSearch() {
    console.log('Buscando usuário com ID:', this.searchQuery);
  }

  createUser() {
    console.log('Criar novo usuário');
  }

  editUser() {
    console.log('Editar usuário');
  }

  deleteUser() {
    console.log('Deletar usuário');
  }
}
