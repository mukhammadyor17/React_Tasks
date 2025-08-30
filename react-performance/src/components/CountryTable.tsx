import { useEffect, useState, useMemo, Fragment } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

interface CountyInfo {
  year: number;
  population: number;
  cement_co2: number;
  cumulative_cement_co2: number;
  cumulative_luc_co2: number;
  land_use_change_co2: number;
  land_use_change_co2_per_capita: number;
  methane: number;
  methane_per_capita: number;
}

interface CountryRaw {
  [key: string]: {
    iso_code: string;
    data: CountyInfo[];
  };
}

interface CountryItem {
  name: string;
  iso_code: string;
  data: CountyInfo[];
}

const sortBy = ['Sort', 'Name', 'Population'];
const orderBy = ['Asc', 'Desc'];

const allColumns: { key: keyof CountyInfo; label: string }[] = [
  { key: 'population', label: 'Population' },
  { key: 'cement_co2', label: 'CO2' },
  { key: 'cumulative_cement_co2', label: 'Cumulative CO2' },
  { key: 'cumulative_luc_co2', label: 'Cumulative LUC CO2' },
  { key: 'land_use_change_co2', label: 'Land Use Change CO2' },
  {
    key: 'land_use_change_co2_per_capita',
    label: 'Land Use Change CO2 per Capita',
  },
  { key: 'methane', label: 'Methane' },
  { key: 'methane_per_capita', label: 'Methane per Capita' },
];

const fetchCountries = async (): Promise<CountryRaw> => {
  const res = await fetch('../data.json');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const CountryTable = () => {
  const [years, setYears] = useState<number[]>([]);
  const [filter, setFilter] = useState({
    name: '',
    year: 2023,
    sortBy: 'Sort',
    orderBy: 'Asc',
  });
  const [highlightedYear, setHighlightedYear] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(
    null
  );

  const [visibleColumns, setVisibleColumns] = useState<(keyof CountyInfo)[]>([
    'population',
    'cement_co2',
    'cumulative_cement_co2',
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ['get_countries'],
    queryFn: fetchCountries,
  });

  const countries: CountryItem[] = useMemo(() => {
    return Object.entries(data).map(([name, info]) => ({
      name,
      iso_code: info.iso_code,
      data: info.data,
    }));
  }, [data]);

  useEffect(() => {
    if (countries.length > 0) {
      const list = countries[0].data.map((item) => item.year);
      setYears(list);
      setFilter((prev) => ({
        ...prev,
        year: list[list.length - 1],
      }));
    }
  }, [countries]);

  useEffect(() => {
    if (filter.year) {
      setHighlightedYear(filter.year);
      const timer = setTimeout(() => setHighlightedYear(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [filter.year]);

  const filteredCountries = useMemo(() => {
    let result = countries;

    if (filter.name) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter.sortBy !== 'Sort') {
      result = [...result].sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        if (filter.sortBy === 'Name') {
          valA = a.name;
          valB = b.name;
        } else if (filter.sortBy === 'Population') {
          valA = a.data.find((d) => d.year === filter.year)?.population ?? 0;
          valB = b.data.find((d) => d.year === filter.year)?.population ?? 0;
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return filter.orderBy === 'Asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return filter.orderBy === 'Asc'
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
        }
      });
    }

    return result;
  }, [countries, filter]);

  const toggleColumn = (col: keyof CountyInfo) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4 py-4">
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Search country"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filter.year}
          onChange={(e) =>
            setFilter({ ...filter, year: Number(e.target.value) })
          }
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filter.sortBy}
          onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
        >
          {sortBy.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filter.orderBy}
          onChange={(e) => setFilter({ ...filter, orderBy: e.target.value })}
        >
          {orderBy.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 border rounded-md bg-blue-500 text-white"
        >
          Select Columns
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className={`text-sm py-2 text-gray-500`}>
            <th className="text-left font-light"></th>
            <th className="text-left font-light">Code</th>
            <th className="text-left font-light">Name</th>
            {visibleColumns.map((col) => (
              <th key={col} className="text-left font-light">
                {allColumns.find((c) => c.key === col)?.label ?? col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country) => {
            const entry = country.data.find((d) => d.year === filter.year);
            const isHighlighted = highlightedYear === filter.year;
            const isSelected = selectedCountry?.name === country.name;

            return (
              <Fragment key={country.name}>
                <tr
                  className={`border-t border-gray-300 p-2 text-sm text-gray-700 transition-colors duration-500 ${
                    isHighlighted ? 'bg-yellow-100' : ''
                  }`}
                >
                  <td>
                    <button
                      className="p-1 my-1 cursor-pointer border rounded-md bg-blue-500 text-white"
                      onClick={() =>
                        setSelectedCountry((prev) =>
                          prev?.name === country.name ? null : country
                        )
                      }
                    >
                      {isSelected ? 'close' : 'open'}
                    </button>
                  </td>
                  <td>{country.iso_code ?? 'N/A'}</td>
                  <td>{country.name}</td>
                  {visibleColumns.map((col) => (
                    <td key={col}>
                      {entry && entry[col] !== undefined
                        ? typeof entry[col] === 'number'
                          ? (entry[col] as number).toFixed(2)
                          : entry[col]
                        : 'N/A'}
                    </td>
                  ))}
                </tr>

                {isSelected && (
                  <tr>
                    <td
                      colSpan={3 + visibleColumns.length}
                      className="p-4 bg-gray-50 text-sm text-gray-800"
                    >
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        <p className="font-semibold text-gray-600">
                          Detailed data for {country.name} ({filter.year})
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          {Object.entries(entry ?? {}).map(([key, value]) => (
                            <li key={key}>
                              <span className="font-medium">{key}:</span>{' '}
                              {typeof value === 'number'
                                ? value.toLocaleString()
                                : String(value)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Select Columns</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {allColumns.map((col) => (
                <label key={col.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => toggleColumn(col.key)}
                  />
                  {col.label}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryTable;
