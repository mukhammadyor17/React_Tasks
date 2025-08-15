import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('AboutPage');

  return (
    <div className="bg-indigo-50 dark:bg-gray-900 min-h-screen flex justify-center items-center flex-col -mt-[70px] p-4">
      <div className="bg-white dark:bg-gray-800 shadow-sm p-10 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-2">
        <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">{t('author')}: </b>
          Mukhammadyorkhon Turskhanov
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white"> {t('location')}: </b>
          Kazakhstan
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white"> {t('course')}: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            href="https://rs.school/courses/reactjs"
          >
            React.Js
          </a>
        </div>
      </div>
    </div>
  );
}
