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
  cumulative_cement_co2: number;
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
        <tr className="grid grid-cols-5 text-sm py-2 text-gray-500 ">
          <th className="text-left font-light">Name</th>
          <th className="text-left font-light">Code</th>
          <th className="text-left font-light">Population (Last year)</th>
          <th className="text-left font-light">CO2</th>
          <th className="text-left font-light">CO2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data!).map(([country, info]) => (
          <tr
            key={country}
            className="grid grid-cols-5 border-t border-gray-300 py-2 text-sm text-gray-700"
          >
            <td>{country}</td>
            <td>{info.iso_code ?? 'N/A'}</td>
            <td>
              {info.data.at(-1)?.year}. {info.data.at(-1)?.population ?? 'N/A'}
            </td>
            <td>{info.data.at(-1)?.cement_co2?.toFixed(2) ?? 'N/A'}</td>
            <td>
              {info.data.at(-1)?.cumulative_cement_co2?.toFixed(2) ?? 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryTable;
