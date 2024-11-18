import { User } from './user';  // Importando a tipagem de User

export interface Car {
  id: number;
  year: number;
  licensePlate: string;
  model: string;
  color: string;
  user?: User;
}
