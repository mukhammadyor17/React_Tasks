import type { ReactNode } from 'react';

type ModalWrapperProps = {
  children: ReactNode;
  onClose: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[500px] relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
