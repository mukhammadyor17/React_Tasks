import { NavLink, Outlet } from 'react-router';
import { useAppContext } from './context/app_context/AppContextProvider';
import ErrorBoundary from './components/error_boundary/ErrorBoundary';

function App() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <ErrorBoundary>
      <div className="px-10 py-5 h-[70px] w-full bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 shadow-xs fixed left-0 right-0 top-0 z-50">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          React.Course
        </div>
        <ul className="flex gap-5 items-center">
          <li>
            <NavLink
              to={'/React_Tasks/'}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/React_Tasks/about'}
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              About
            </NavLink>
          </li>
          <button
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition-colors duration-200 flex items-center gap-2"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                Light
              </>
            )}
          </button>
        </ul>
      </div>
      <div className="pt-[70px] min-h-screen bg-gray-50 dark:bg-gray-800">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default App;
