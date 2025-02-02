import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from '../../button';
import styles from './ErrorBoundary.module.scss';

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
        <p className={styles.error}>
          {this.props.fallback || (
            <h1 className={styles.title}>Oops! Something went wrong.</h1>
          )}
          <Button text="Reload the page" onClick={this.handleReloadClick} />
        </p>
      );
    }

    return this.props.children;
  }
}
