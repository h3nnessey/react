import type { Country } from '@/shared/constants';

export type FormId = string;

export interface FormEntity {
  id: FormId;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  tNc: boolean;
  imageBase64: string;
  country: Country['name'];
}
