import { Suspense, useEffect } from 'react';
import Loader from './components/Loader';

const fetchData = async () => {
  const response = fetch('../data.json');
  const data = (await response).json();
  return data;
};

const App = () => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold underline">Hello, React!</h1>
      </div>
    </Suspense>
  );
};

export default App;
