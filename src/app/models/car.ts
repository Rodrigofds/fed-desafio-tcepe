import { User } from './user';

export interface Car {
  id?: number;
  year?: string;
  licensePlate?: string;
  model?: string;
  color?: string;
  user?: User;
}
