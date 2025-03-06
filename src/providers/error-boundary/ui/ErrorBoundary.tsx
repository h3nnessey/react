'use client';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { classnames } from '@/shared/lib/styling';
import { ErrorMessage } from '@/shared/ui/components';
import { Theme } from '@/shared/ui/theme';
import styles from './ErrorBoundary.module.scss';

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error.message, errorInfo.componentStack);
  }

  render() {
    const { children, fallback } = this.props;

    if (this.state.hasError) {
      return (
        fallback || (
          <div className={classnames(styles.container, Theme.Dark)}>
            <ErrorMessage message="Something went wrong. Please reload the page." />
          </div>
        )
      );
    }

    return children;
  }
}
