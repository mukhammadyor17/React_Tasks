import { NavLink, Outlet } from 'react-router';
import { useAppContext } from './context/app_context/AppContextProvider';
import ErrorBoundary from './components/error_boundary/ErrorBoundary';

function App() {
  const { theme, toggleTheme } = useAppContext();

  console.log(theme);

  return (
    <ErrorBoundary>
      <div className="px-10 py-5 h-[70px] w-full bg-white flex items-center justify-between border-b border-gray-200 shadow-xs fixed left-0 right-0 top-0">
        <div className="text-xl font-bold">React.Course</div>
        <ul className="flex gap-5 items-center">
          <li>
            <NavLink to={'/React_Tasks/'}>Main</NavLink>
          </li>
          <li>
            <NavLink to={'/React_Tasks/about'}>About</NavLink>
          </li>
          <button
            className="px-2 py-1 rounded-sm bg-indigo-500 text-white"
            onClick={() => toggleTheme()}
          >
            Change Theme
          </button>
        </ul>
      </div>
      <div className="pt-[70px]">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default App;
