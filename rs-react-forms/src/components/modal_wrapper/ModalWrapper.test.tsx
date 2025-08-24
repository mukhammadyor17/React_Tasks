import { render, screen, fireEvent } from '@testing-library/react';
import ModalWrapper from './ModalWrapper';

describe('ModalWrapper', () => {
  it('renders children content', () => {
    render(
      <ModalWrapper onClose={() => {}}>
        <div>Modal Content</div>
      </ModalWrapper>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    const onClose = vi.fn();
    render(
      <ModalWrapper onClose={onClose}>
        <div>Content</div>
      </ModalWrapper>
    );

    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('focuses the close button on mount', () => {
    render(
      <ModalWrapper onClose={() => {}}>
        <div>Content</div>
      </ModalWrapper>
    );

    expect(screen.getByLabelText(/close modal/i)).toHaveFocus();
  });

  it('closes modal when pressing ESC key', () => {
    const onClose = vi.fn();
    render(
      <ModalWrapper onClose={onClose}>
        <div>Content</div>
      </ModalWrapper>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('closes modal when clicking overlay', () => {
    const onClose = vi.fn();
    render(
      <ModalWrapper onClose={onClose}>
        <div>Content</div>
      </ModalWrapper>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when clicking inside modal content', () => {
    const onClose = vi.fn();
    render(
      <ModalWrapper onClose={onClose}>
        <button>Inside</button>
      </ModalWrapper>
    );

    fireEvent.click(screen.getByText('Inside'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
