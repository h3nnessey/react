import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from '../../button';
import { ErrorMessage } from '../../error-message';

interface ErrorBoundaryProps {
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

  private handleReloadClick = () => {
    window.location.reload();
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <>
            <ErrorMessage message="Oops, something went wrong">
              <Button text="Reload the page" onClick={this.handleReloadClick} />
            </ErrorMessage>
          </>
        )
      );
    }

    return this.props.children;
  }
}
