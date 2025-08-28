import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from './components/Loader';
import CountryTable from './components/CountryTable';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<Loader />}>
      <div className="w-full h-full p-10">
        <div className="max-w-3xl mx-auto bg-gray-100 p-5 rounded-md">
          <CountryTable />
        </div>
      </div>
    </Suspense>
  </QueryClientProvider>
);

export default App;
