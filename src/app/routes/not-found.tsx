import { Link } from 'react-router';
import { Button, ErrorMessage } from '@/shared/ui/components';
import { Theme } from '@/shared/ui/theme/lib/ThemeContext';

export const MESSAGE = 'Page not found';

export default function NotFoundPage() {
  return (
    <div className={Theme.Dark} role="not-found">
      <ErrorMessage message={MESSAGE}>
        <Button style={{ position: 'relative' }}>
          <Link to={'/'} className="link">
            Go to main page
          </Link>
        </Button>
      </ErrorMessage>
    </div>
  );
}
