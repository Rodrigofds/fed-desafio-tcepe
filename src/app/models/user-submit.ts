import { CarSubmit } from "./car-submit";

export interface UserSubmit {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  birthday?: string;
  login: string;
  password: string;
  phone?: string;
  cars: CarSubmit[];
}
