import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-saas-darkGray text-white p-8 text-center">
          <h1 className="text-4xl font-black mb-4">Algo salió mal</h1>
          <p className="text-slate-400 mb-6 max-w-md">
            Ocurrió un error inesperado. Por favor, recarga la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-saas-orange text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition-all"
          >
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
