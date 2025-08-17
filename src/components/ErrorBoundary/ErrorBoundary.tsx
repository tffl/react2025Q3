import { Component, type ReactNode } from "react";

import absoluteCinema from "../../assets/absolute_cinema.jpg";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <img
            src={absoluteCinema}
            alt="Absolute Cinema"
            className="cinema-img"
          />
          <button
            onClick={() => window.location.reload()}
            className="reload-btn"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
