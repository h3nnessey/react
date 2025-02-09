import { useNavigate } from 'react-router';
import { Button, ErrorMessage } from '@/shared/ui';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  };
  return (
    <ErrorMessage message="Page not found">
      <Button onClick={handleClick}>Go to main page</Button>
    </ErrorMessage>
  );
};
