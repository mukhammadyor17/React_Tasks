import HomePage from './pages/HomePage';
import ErrorBoundary from './components/error_boundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
