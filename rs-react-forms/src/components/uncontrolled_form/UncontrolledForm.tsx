import ModalWrapper from '../modal_wrapper/ModalWrapper';

const UncontrolledForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <h2 id="uncontrolled-title" className="text-xl font-semibold mb-4">
        Uncontrolled Form
      </h2>
      <div>UncontrolledForm content...</div>
    </ModalWrapper>
  );
};

export default UncontrolledForm;
