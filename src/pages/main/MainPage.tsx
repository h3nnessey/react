import { useAppSelector } from '@/app/store';
import { formsSlice } from '@/features/forms/model/forms.slice';

export const MainPage = () => {
  const uncontrolledForms = useAppSelector(
    formsSlice.selectors.uncontrolledForms
  );

  return (
    <div>
      <pre>{JSON.stringify(uncontrolledForms, null, 2)}</pre>
    </div>
  );
};
