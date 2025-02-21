import { useNavigate } from 'react-router';
import { Button, ErrorMessage } from '@/shared/ui/components';

export const MESSAGE = 'Page not found';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <div role="not-found">
      <ErrorMessage message={MESSAGE}>
        <Button onClick={handleClick}>Go to main page</Button>
      </ErrorMessage>
    </div>
  );
};
