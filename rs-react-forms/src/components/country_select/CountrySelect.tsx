import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useFormContext } from 'react-hook-form';

const CountryAutocomplete = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const countries = useSelector(
    (state: RootState) => state.country.countryList
  );

  const [query, setQuery] = useState('');
  const selectedCountry = watch('country');

  const filteredCountries =
    query === ''
      ? []
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (countryName: string) => {
    setValue('country', countryName, { shouldValidate: true });
    setQuery('');
  };

  return (
    <div className="col-span-2 relative">
      <label htmlFor="country" className="block font-medium">
        Country
      </label>
      <input
        id="country"
        type="text"
        {...register('country')}
        className={`mt-1 w-full border rounded p-2 ${
          errors.country ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Type your country..."
        onChange={(e) => setQuery(e.target.value)}
        defaultValue={selectedCountry}
      />
      {filteredCountries.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
          {filteredCountries.map((c) => (
            <div
              key={c.name}
              className="p-2 cursor-pointer hover:bg-indigo-500 hover:text-white"
              onClick={() => handleSelect(c.name)}
            >
              {c.name}
            </div>
          ))}
        </div>
      )}
      {errors.country && (
        <p className="text-red-500 text-sm mt-1">
          {errors.country.message as string}
        </p>
      )}
    </div>
  );
};

export default CountryAutocomplete;
