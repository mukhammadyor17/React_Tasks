import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import UncontrolledForm from './UncontrolledForm';
import { store } from '../../store/store';

vi.mock('../../store/features/user/userSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    addNewUser: vi.fn((payload) => ({ type: 'user/addNewUser', payload })),
  };
});

vi.mock('../modal_wrapper/ModalWrapper', () => ({
  default: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="modal-wrapper">
      <button onClick={onClose} data-testid="modal-close">
        Close
      </button>
      {children}
    </div>
  ),
}));

describe('UncontrolledForm', () => {
  const mockOnClose = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(mockDispatch).mockReturnValue(mockDispatch);
  });

  const renderForm = () => {
    return render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );
  };

  describe('Form Rendering', () => {
    it('renders all form fields correctly', () => {
      renderForm();

      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Male$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Female/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Other/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Country Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Choose file/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/I accept Terms/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument();
    });

    it('renders within ModalWrapper', () => {
      renderForm();
      expect(screen.getByTestId('modal-wrapper')).toBeInTheDocument();
    });
  });

  describe('Gender Selection', () => {
    it('allows selection of different gender options', () => {
      renderForm();

      const maleRadio = screen.getByLabelText(/^Male$/i);
      const femaleRadio = screen.getByLabelText(/Female/i);
      const otherRadio = screen.getByLabelText(/Other/i);

      fireEvent.click(femaleRadio);
      expect(femaleRadio).toBeChecked();
      expect(maleRadio).not.toBeChecked();
      expect(otherRadio).not.toBeChecked();

      fireEvent.click(otherRadio);
      expect(otherRadio).toBeChecked();
      expect(femaleRadio).not.toBeChecked();
      expect(maleRadio).not.toBeChecked();
    });
  });

  describe('Modal Integration', () => {
    it('calls onClose when modal close button is clicked', () => {
      renderForm();

      fireEvent.click(screen.getByTestId('modal-close'));

      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
