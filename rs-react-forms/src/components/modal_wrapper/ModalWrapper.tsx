import { useEffect, useRef } from 'react';

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-[500px] relative"
        role="document"
      >
        <button
          ref={closeBtnRef}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 focus:outline-none rounded"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
