import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  editUser(): void {
    if (this.selectedUserId === null) {
      console.error('Nenhum usuário selecionado');
      return;
    }

    const updatedUser: User = {
      id: this.selectedUserId,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      email: this.newUser.email,
      birthday: this.newUser.birthday,
      login: this.newUser.login,
      password: this.newUser.password,
      phone: this.newUser.phone,
      cars: this.newUser.cars
    };

    this.userService.updateUser(this.selectedUserId, updatedUser).subscribe({
      next: (response) => {
        console.log('Usuário atualizado com sucesso:', response);
        this.loadUsers();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
      }
    });
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

    if (this.newUser.cars.length < 5) {
      this.newUser.cars.push({ year: '', model: '', licensePlate: '', color: '' });
    } else {
      alert("Você só pode adicionar até 5 carros.");
    }
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
