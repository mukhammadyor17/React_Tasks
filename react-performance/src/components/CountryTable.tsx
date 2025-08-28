import { useSuspenseQuery } from '@tanstack/react-query';

interface Country {
  [key: string]: {
    iso_code: string;
    data: CountyInfo[];
  };
}

interface CountyInfo {
  year: number;
  population: number;
  cement_co2: number;
}

const fetchCountries = async (): Promise<Country> => {
  const res = await fetch('../data.json');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const CountryTable = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['get_countries'],
    queryFn: fetchCountries,
  });

  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-3">
          <th className="text-left">Name</th>
          <th className="text-left">Code</th>
          <th className="text-left">Population (Last year)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data!).map(([country, info]) => (
          <tr key={country} className="grid grid-cols-3 border-t">
            <td>{country}</td>
            <td>{info.iso_code ?? 'N/A'}</td>
            <td>{info.data.at(-1)?.population ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryTable;
