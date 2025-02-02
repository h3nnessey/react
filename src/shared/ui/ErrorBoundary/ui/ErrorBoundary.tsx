import { Component, type ReactNode, type ErrorInfo } from 'react';
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <h1 className={styles.errorBoundary}>Oops! Something went wrong.</h1>
        )
      );
    }

    return this.props.children;
  }
}
