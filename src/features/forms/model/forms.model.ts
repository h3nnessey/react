import { z } from 'zod';
import { COUNTRIES } from '@/shared/constants/countries';
import type { InputType } from '@/shared/ui';
import { validatePasswordStrength } from '../lib';

export type FormId = string;

export interface FormEntity {
  id: FormId;
  type: 'uncontrolled' | 'controlled';
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  tNc: boolean;
  image: string;
  country: string;
  gender: string;
}

export const formFields = {
  name: 'name',
  age: 'age',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  tNc: 'tNc',
  image: 'image',
  country: 'country',
  gender: 'gender',
} as const;

export const FormSchema = z
  .object({
    [formFields.name]: z
      .string()
      .nonempty({ message: 'Name is required' })
      .refine(
        value => value.length > 0 && value[0] === value[0].toUpperCase(),
        {
          message: 'Name must start with a capital letter',
        }
      ),
    [formFields.age]: z
      .string()
      .nonempty({ message: 'Age is required' })
      .refine(value => /^\d+$/.test(value), {
        message: 'Age must be a positive integer',
      })
      .transform(value => Number(value)),
    [formFields.gender]: z.preprocess(
      value => (value === undefined ? '' : value),
      z.string().nonempty({ message: 'Gender is required' })
    ),
    [formFields.email]: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    [formFields.password]: z
      .string()
      .nonempty({ message: 'Password is required' })
      .refine(
        value => {
          const { isValid } = validatePasswordStrength(value);
          return isValid;
        },
        value => {
          const { errorMessage } = validatePasswordStrength(value);
          return { message: errorMessage || 'Invalid password' };
        }
      ),
    [formFields.confirmPassword]: z
      .string()
      .nonempty({ message: 'Confirm password is required' }),
    [formFields.tNc]: z.preprocess(
      value => value === 'on',
      z.boolean().refine(value => value === true, {
        message: 'You must accept the terms and conditions',
      })
    ),
    [formFields.image]: z
      .instanceof(File, { message: 'Image is required' })
      .refine(
        file => file.type === 'image/jpeg' || file.type === 'image/png',
        'File must be a .jpeg or .png'
      )
      .refine(
        file => file.size <= 200 * 1024,
        'File size must be less than 200 KB'
      ),
    [formFields.country]: z
      .string()
      .nonempty({ message: 'Country is required' })
      .refine(country => COUNTRIES.includes(country), 'Invalid country'),
  })
  .refine(
    form => form[formFields.password] === form[formFields.confirmPassword],
    {
      message: 'Passwords do not match',
      path: [formFields.confirmPassword],
    }
  );

export const configureFormFields = (
  countries: string[] = []
): {
  id: string;
  name: string;
  type: InputType;
  label: string;
  options?: string[];
  accept?: string;
}[] => {
  return [
    {
      id: formFields.name,
      name: formFields.name,
      type: 'text',
      label: 'Name',
    },
    {
      id: formFields.age,
      name: formFields.age,
      type: 'text',
      label: 'Age',
    },
    {
      id: formFields.email,
      name: formFields.email,
      type: 'email',
      label: 'Email',
    },
    {
      id: formFields.password,
      name: formFields.password,
      type: 'password',
      label: 'Password',
    },
    {
      id: formFields.confirmPassword,
      name: formFields.confirmPassword,
      type: 'password',
      label: 'Confirm password',
    },
    {
      id: formFields.gender,
      name: formFields.gender,
      type: 'radio',
      label: 'Gender',
      options: ['Male', 'Female', 'Other'],
    },
    {
      id: formFields.tNc,
      name: formFields.tNc,
      type: 'checkbox',
      label: 'Accept Terms and Conditions',
    },
    {
      id: formFields.image,
      name: formFields.image,
      type: 'file',
      label: 'Image',
      accept: '.jpeg, .png',
    },
    {
      id: formFields.country,
      name: formFields.country,
      type: 'datalist',
      label: 'Country',
      options: countries,
    },
  ];
};
