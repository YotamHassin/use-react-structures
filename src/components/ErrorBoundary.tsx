'use client';

import React, { ErrorInfo, PropsWithChildren } from "react";

/* const [errorMessage, setErrorMessage] = useState<ErrorDetails | undefined>(undefined) */
export interface ErrorDetails {
  error: any;
  errorInfo: React.ErrorInfo | undefined;
}

export interface EBProps {
  //setErrorMessage?: React.Dispatch<React.SetStateAction<ErrorDetails | undefined>>;
  location?: string;
}

export type ErrorBoundaryProps = PropsWithChildren<EBProps>;

export interface HasErrorState {
  hasError: boolean;
  error: any;
}

{/* <ErrorBoundary  location={'MyFrameComponent.iframe: ' + src}>
</ErrorBoundary> */}
//class ErrorBoundary<ErrorBoundaryState extends HasErrorState> extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, HasErrorState> {
  constructor(props: EBProps) {
    super(props);
    /* set initial state (no error), error will be set in static getDerivedStateFromError */
    //this.state = {};
    //this.setState({ hasError: false, error: undefined });
  }

  /* set error state when error */
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  /* getSnapshotBeforeUpdate(prevProps: Readonly<ErrorBoundaryProps>, prevState: Readonly<HasErrorState>) { 
    console.log('ErrorBoundary getSnapshotBeforeUpdate' + this.Location, {prevProps, prevState});
    
  } */

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.logError(errorInfo);
  }

  get Location() {
    return this.props?.location ? ` in location: ${this.props?.location}` : "";
  }

  logError = (errorInfo?: ErrorInfo) => {
    const errorDetails: ErrorDetails = { error: this?.state?.error, errorInfo };
    console.error('error ' + this.Location, errorDetails);
    /* if (this.props.setErrorMessage) {
      this.props.setErrorMessage(errorDetails);
    } */
  }

  render() {
    if (this?.state?.hasError || this?.state?.error) {
      this.logError();
      // You can render any custom fallback UI
      return <h1>Something went wrong {this.Location}.</h1>;
    }

    return <>
      {/* {this.Location} */}
      {this.props.children}
    </>;
  }
}

export default ErrorBoundary;