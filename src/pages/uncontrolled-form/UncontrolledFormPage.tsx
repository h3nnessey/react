import { useState, type ComponentProps } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  configureFormFields,
  FormSchema,
} from '@/features/forms/model/forms.model';
import { formsSlice } from '@/features/forms/model/forms.slice';
import { readFileAsBase64 } from '@/shared/lib/fs';
import { InputField } from '@/shared/ui';
import styles from './UncontrolledFormPage.module.scss';

export const UncontrolledFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(formsSlice.selectors.countries);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const config = configureFormFields(countries);

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData);
    const validationResult = FormSchema.safeParse(rawData);

    if (validationResult.success) {
      const imageBase64 = await readFileAsBase64(validationResult.data.image);

      dispatch(
        formsSlice.actions.addForm({
          ...validationResult.data,
          image: imageBase64,
          type: 'uncontrolled',
        })
      );

      setErrors({});

      await navigate({ pathname: '/' });
    } else {
      const errorsByField: Record<string, string> = {};

      validationResult.error.errors.forEach(error => {
        const fieldName = error.path[0];

        if (!errorsByField[fieldName]) {
          errorsByField[fieldName] = error.message;
        }
      });

      setErrors(errorsByField);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {config.map(({ id, name, ...props }) => (
        <InputField
          key={id}
          id={id}
          name={name}
          error={errors[name]}
          {...props}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
