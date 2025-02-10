import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { ErrorMessage } from '../../error-message';
import { Button } from '../../button';

export const MESSAGE = 'Oops, something went wrong';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error.message, errorInfo.componentStack);
  }

  handleReloadClick = () => {
    window.location.reload();
  };

  render() {
    const { fallback, children } = this.props;

    if (this.state.hasError) {
      return (
        fallback || (
          <>
            <ErrorMessage message={MESSAGE}>
              <Button onClick={this.handleReloadClick}>Reload the page</Button>
            </ErrorMessage>
          </>
        )
      );
    }

    return children;
  }
}
