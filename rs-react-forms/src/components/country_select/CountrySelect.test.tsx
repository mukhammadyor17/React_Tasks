import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { store } from '../../store/store';
import CountryAutocomplete from './CountrySelect';

const renderWithProviders = (ui: React.ReactNode) => {
  const Wrapper = () => {
    const methods = useForm();
    return (
      <Provider store={store}>
        <FormProvider {...methods}>{ui}</FormProvider>
      </Provider>
    );
  };

  return render(<Wrapper />);
};

describe('CountryAutocomplete', () => {
  it('renders input and label', () => {
    renderWithProviders(<CountryAutocomplete />);

    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/type your country/i)
    ).toBeInTheDocument();
  });

  it('shows filtered countries when typing query', () => {
    renderWithProviders(<CountryAutocomplete />);

    const input = screen.getByPlaceholderText(/type your country/i);
    fireEvent.change(input, { target: { value: 'jap' } });

    expect(screen.queryByText('Japan')).toBeInTheDocument();
    expect(screen.queryByText('Kazakhstan')).not.toBeInTheDocument();
  });

  it('selects a country from suggestions', () => {
    renderWithProviders(<CountryAutocomplete />);

    const input = screen.getByPlaceholderText(/type your country/i);
    fireEvent.change(input, { target: { value: 'kaz' } });

    fireEvent.click(screen.getByText('Kazakhstan'));

    expect((input as HTMLInputElement).value).toBe('Kazakhstan');
    expect(screen.queryByText('Kazakhstan')).not.toBeInTheDocument();
  });
});
