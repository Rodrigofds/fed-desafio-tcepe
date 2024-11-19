import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  newCar: Car = { year: undefined, model: '', color: '' };
  selectedCarId: number | null = null;
  modalMode: 'create' | 'edit' | 'delete' = 'create';
  showModal: boolean = false;

  constructor(private carService: CarService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
      console.log('Cars loaded:', this.cars);
    });
  }

  logout(): void {
    this.authService.logout();
    // Redirecionar para a página de login ou outra página
  }

  openModal(mode: 'create' | 'edit', carId?: number): void {
    this.modalMode = mode;
    if (mode === 'edit' && carId) {
      const carToEdit = this.cars.find(c => c.id === carId);
      this.newCar = { ...carToEdit }; // Clonando o carro para edição
      this.selectedCarId = carId;
    } else {
      this.newCar = { year: undefined, model: '', color: '' }; // Resetando para criação
      this.selectedCarId = null;
    }
    this.showModal = true;
  }

  createCar(car: Car): void {
    this.carService.createCar(car).subscribe(newCar => {
      if (newCar) {
        this.cars.push(newCar);
        console.log('New car added:', newCar);
        this.closeModal();
      }
    });
  }

  updateCar(carId: number, car: Car): void {
    this.carService.updateCar(carId, car).subscribe(updatedCar => {
      if (updatedCar) {
        const index = this.cars.findIndex(c => c.id === carId);
        if (index !== -1) {
          this.cars[index] = updatedCar;
          console.log('Car updated:', updatedCar);
          this.closeModal();
        }
      }
    });
  }

  deleteCar(carId: number): void {
    this.carService.deleteCar(carId).subscribe(() => {
      this.cars = this.cars.filter(c => c.id !== carId);
      console.log('Car deleted:', carId);
      this.closeModal();
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.newCar = { year: undefined, model: '', color: '' };
  }
}
