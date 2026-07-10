import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'system-ui', maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
          <h1 style={{ color: '#E85D4C' }}>Something went wrong</h1>
          <pre style={{ background: '#fee', padding: 16, borderRadius: 8, textAlign: 'left', overflow: 'auto', maxHeight: 300, fontSize: 12 }}>
            {this.state.error?.message}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '8px 24px', borderRadius: 8, border: 'none', background: '#E85D4C', color: 'white', cursor: 'pointer' }}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
