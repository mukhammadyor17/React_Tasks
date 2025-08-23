import { useState } from 'react';
import { createPortal } from 'react-dom';
import ControlledForm from './components/controlled_form/ControlledForm';
import UncontrolledForm from './components/uncontrolled_form/UncontrolledForm';

const btnClass =
  'px-10 py-5 rounded-xl text-white shadow-sm cursor-pointer bg-indigo-500 transition-all transform active:scale-95 hover:shadow-2xl';

const App = () => {
  const [modalType, setModalType] = useState<
    null | 'controlled' | 'uncontrolled'
  >(null);
  const modalElement = document.getElementById('modal') as HTMLElement;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-10 flex gap-10">
        <button className={btnClass} onClick={() => setModalType('controlled')}>
          Show controlled modal
        </button>
        <button
          className={btnClass}
          onClick={() => setModalType('uncontrolled')}
        >
          Show uncontrolled modal
        </button>
      </div>

      {modalType === 'controlled' &&
        createPortal(
          <ControlledForm onClose={() => setModalType(null)} />,
          modalElement
        )}

      {modalType === 'uncontrolled' &&
        createPortal(
          <UncontrolledForm onClose={() => setModalType(null)} />,
          modalElement
        )}
    </div>
  );
};

export default App;
