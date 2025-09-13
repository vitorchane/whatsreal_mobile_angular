import { Plan } from './plan.model';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  plan: Plan;
}