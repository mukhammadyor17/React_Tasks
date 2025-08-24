import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../utils/form_validator';
import ControlledForm from './ControlledForm';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

const renderForm = () => {
  const Wrapper = () => {
    const methods = useForm({
      resolver: zodResolver(formSchema),
    });
    return (
      <Provider store={store}>
        <FormProvider {...methods}>
          <ControlledForm onClose={() => {}} />
        </FormProvider>
      </Provider>
    );
  };
  return render(<Wrapper />);
};

describe('UserForm validation flow', () => {
  it('should validate required fields and enable submit when valid', async () => {
    renderForm();

    const submitBtn = screen.getByRole('button', { name: /submit/i });

    expect(submitBtn).toBeDisabled();

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'not-an-email' },
    });

    fireEvent.blur(screen.getByLabelText(/Email/i));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    fireEvent.input(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByLabelText(/Age/i), {
      target: { value: '25' },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Qwerty1!' },
    });
    fireEvent.input(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'Qwerty1!' },
    });
    fireEvent.input(screen.getByLabelText(/Country/i), {
      target: { value: 'USA' },
    });
    fireEvent.click(screen.getByLabelText(/^Male$/i));
    fireEvent.click(screen.getByLabelText(/Accept terms/i));

    const fileInput = screen.getByLabelText(
      /Profile Picture/i
    ) as HTMLInputElement;
    const file = new File(['hello'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(submitBtn).not.toHaveAttribute('disabled', 'true');
    });
  });
});
