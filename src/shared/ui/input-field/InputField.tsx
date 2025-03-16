import { BaseInput, type BaseInputProps } from './ui/BaseInput';
import { CheckboxInput } from './ui/CheckboxInput';
import { DatalistInput } from './ui/DatalistInput';
import { RadioInput } from './ui/RadioInput';

export type InputType =
  | 'datalist'
  | 'text'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'file'
  | 'radio';

export interface InputFieldProps extends BaseInputProps {
  type: InputType;
  options?: string[];
  accept?: string;
}

export const InputField = ({
  type,
  id,
  name,
  label,
  error,
  options = [],
  accept,
  ...props
}: InputFieldProps) => {
  switch (type) {
    case 'checkbox':
      return (
        <CheckboxInput
          id={id}
          name={name}
          label={label}
          error={error}
          {...props}
        />
      );
    case 'radio':
      return (
        <RadioInput
          id={id}
          name={name}
          label={label}
          error={error}
          options={options}
          {...props}
        />
      );
    case 'datalist':
      return (
        <DatalistInput
          id={id}
          name={name}
          label={label}
          error={error}
          options={options}
          {...props}
        />
      );
    default:
      return (
        <BaseInput
          id={id}
          name={name}
          label={label}
          error={error}
          type={type}
          accept={accept}
          {...props}
        />
      );
  }
};
