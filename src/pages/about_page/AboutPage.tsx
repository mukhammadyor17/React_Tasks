const AboutPage = () => {
  return (
    <div className="bg-indigo-50 dark:bg-gray-900 min-h-screen flex justify-center items-center flex-col -mt-[70px] p-4">
      <div className="bg-white dark:bg-gray-800 shadow-sm p-10 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-2">
        <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          About This Application
        </h1>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">Author: </b>
          Mukhammadyorkhon Turskhanov
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">Location: </b>
          Kazakhstan
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">Register for course: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            href="https://app.rs.school/registry/student"
          >
            Register
          </a>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">Course website: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            href="https://app.rs.school"
          >
            Main page
          </a>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <b className="text-gray-900 dark:text-white">Github: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            href="https://github.com/rolling-scopes-school"
          >
            Click here
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
