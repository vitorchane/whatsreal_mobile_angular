import { Features } from './features.model';

export interface Plan {
  type: string;
  status: 'active' | 'inactive';
  description: string;
  features: Features;
}