// app/Header.tsx (Client Component)
'use client';

import { useAppContext } from '../../context/app_context/AppContextProvider';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useAppContext();

  if (!mounted) return null;

  return (
    <div className="px-10 py-5 h-[70px] w-full bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 shadow-xs fixed left-0 right-0 top-0 z-50">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        React.Course
      </div>
      <ul className="flex gap-5 items-center">
        <li>
          <Link
            href="/"
            className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${pathname === '/' ? 'active' : ''}`}
          >
            Main
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
        </li>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition-colors duration-200 flex items-center gap-2"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <LocaleSwitcher />
      </ul>
    </div>
  );
}
