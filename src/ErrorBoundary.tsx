import { Component} from "react";
import type {ReactNode} from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error capturée :", error);
  }

  render() {
    if (this.state.hasError) {
      return <h2>❌ Une erreur est survenue dans l’application.</h2>;
    }
    return this.props.children;
  }
}
