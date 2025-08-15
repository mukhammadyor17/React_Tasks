'use client';

import { useLocale } from 'next-intl';
import { setUserLocale } from '../../services/locale';
import { Locale } from '../../i18n/config';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const nextLocale = locale === 'en' ? 'ru' : 'en';

  const changeHandler = () => {
    setUserLocale(nextLocale as Locale);
  };

  return (
    <button
      className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition-colors duration-200 flex items-center gap-2"
      onClick={changeHandler}
    >
      🌐 {nextLocale}
    </button>
  );
}
