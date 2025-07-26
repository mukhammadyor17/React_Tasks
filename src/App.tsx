import HomePage from './pages/home_page/HomePage';
import ErrorBoundary from './components/error_boundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="px-10 py-5 h-[70px] w-full bg-white flex items-center justify-between border-b border-gray-200 shadow-xs fixed left-0 right-0 top-0">
        <div className="text-xl font-bold">React.Course</div>
        <ul className="flex gap-5">
          <li>Main</li>
          <li>About</li>
        </ul>
      </div>
      <div className="pt-[70px]">
        <HomePage />
      </div>
    </ErrorBoundary>
  );
}

export default App;
