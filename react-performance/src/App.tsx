import { Suspense, Profiler } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from './components/Loader';
import CountryTable from './components/CountryTable';

const queryClient = new QueryClient();

const App = () => {
  const onRender = () => {
    console.log('CountryTable rendered');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <div className="w-full h-full p-10">
          <div className="max-w-5xl mx-auto bg-gray-100 p-5 rounded-md">
            <Profiler id="CountryTable" onRender={onRender}>
              <CountryTable />
            </Profiler>
          </div>
        </div>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
