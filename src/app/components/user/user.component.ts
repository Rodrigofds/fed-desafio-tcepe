import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { UserSubmit } from 'src/app/models/user-submit';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId!: number;
  modalMode: string = '';
  showModal: boolean = false;
  users: any[] = [];
  selectedUserId: number | null = null;
  maxCarRows: number = 0;

  newUser: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    login: '',
    password: '',
    phone: '',
    cars: []
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.newUser.cars = this.newUser.cars || [];

  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cars: user.cars || []
        }));
        this.maxCarRows = Math.max(...this.users.map(user => user.cars.length), 0);
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

  searchUserById(): void {
    if (this.selectedUserId !== null) {
      this.userService.getUserById(this.selectedUserId).subscribe({
        next: (user) => {
          console.log('Usuário encontrado:', user);

          this.newUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            login: user.login,
            password: user.password,
            phone: user.phone,
            cars: user.cars || []
          };

          this.modalMode = 'edit';
          this.showModal = true;
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
        }
      });
    }
    this.loadUsers();
  }

  createUser(newUser: User): void {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      console.error('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const userToSubmit: UserSubmit = {
      ...newUser,
      cars: (newUser.cars || []).map(car => ({
        id: car.id || 0,
        year: car.year || '',
        licensePlate: car.licensePlate || '',
        model: car.model || '',
        color: car.color || ''
      }))
    };

    this.userService.createUser(userToSubmit).subscribe({
      next: (response) => {
        console.log('Usuário criado com sucesso:', response);
        this.loadUsers();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao criar usuário:', err);
      }
    });
    this.loadUsers();
  }

  editUser(): void {
    console.log('Entrei em editUser')
    if (this.selectedUserId && this.newUser) {
      console.log('Tenho o id do usuario e o dados do usuário para editar.')
      console.log('Chamei a service para atualizar....')
        this.userService.updateUser(this.selectedUserId, this.newUser).subscribe(
            (updatedUser) => {
                console.log('Procurando usuário na lista de usuários')
                const index = this.users.findIndex(user => user.id === this.selectedUserId);
                if (index !== -1) {
                    console.log('Achei! Vou setar o novo usuário na lista de usuários')
                    this.users[index] = updatedUser;
                    console.log('Usuário atualizado:', updatedUser);
                }
                console.log('Não achou o usuário')
                this.closeModal();
            },
            (error) => {
                console.error('Erro ao atualizar o usuário:', error);
            }
        );
    } else {
        console.error('ID do usuário não selecionado ou dados do usuário não estão definidos.');
    }
    this.loadUsers();
  }

  deleteUser(): void {
    if (this.selectedUserId) {
      this.userService.deleteUser(this.selectedUserId).subscribe({
        next: (response) => {
          console.log('Usuário excluído com sucesso:', response);
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao excluir usuário:', err);
        }
      });
    }
    this.loadUsers();
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
    console.log(`Usuário selecionado: ID ${userId}`);
  }

  openModal(mode: 'create' | 'edit' | 'delete', userId?: number): void {
    if (mode === 'edit' && userId) {
      this.selectedUserId = userId;
      const selectedUser = this.users.find(user => user.id === userId);
      this.newUser = { ...selectedUser, cars: selectedUser?.cars || [] };
    } else if (mode === 'delete' && userId) {
      this.selectedUserId = userId;
      const selectedUser = this.users.find(user => user.id === userId);
      this.newUser = { ...selectedUser, cars: selectedUser?.cars || [] };
    } else {
      this.newUser = {
        id: undefined,
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
        login: '',
        password: '',
        phone: '',
        cars: []
      };
      this.selectedUserId = null;
    }

    this.modalMode = mode;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newUser = {
      id: undefined,
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      login: '',
      password: '',
      phone: '',
      cars: []
    };
  }

  addCar(): void {
    if (!this.newUser.cars) {
      this.newUser.cars = [];
    }
    const newCar: Car = { year: '', licensePlate: '', model: '', color: ''}
    this.newUser.cars.push(newCar);
  }

  removeCar(index: number): void {
    if (this.newUser.cars && this.newUser.cars.length > index) {
      this.newUser.cars.splice(index, 1);
    }
  }

  getMaxCars(users: any[]): number {
    return Math.max(...users.map(user => user.cars.length));
  }
}
