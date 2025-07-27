const AboutPage = () => {
  return (
    <div className="bg-indigo-50 min-h-screen flex justify-center items-center flex-col -mt-[70px]">
      <div className="bg-white shadow-sm p-10 border border-gray-200 rounded-2xl flex flex-col gap-2">
        <h1 className="text-xl font-semibold mb-3">About This Application</h1>
        <div>
          <b>Author: </b>
          Mukhammadyorkhon Turskhanov
        </div>
        <div>
          <b>Location: </b>
          Kazakhstan
        </div>
        <div>
          <b>Register for course: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 border border-gray-200"
            href="https://app.rs.school/registry/student"
          >
            Register
          </a>
        </div>
        <div>
          <b>Course website: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 border border-gray-200"
            href="https://app.rs.school"
          >
            Main page
          </a>
        </div>
        <div>
          <b>Github: </b>
          <a
            className="px-4 py-1 rounded-sm bg-gray-100 border border-gray-200"
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
