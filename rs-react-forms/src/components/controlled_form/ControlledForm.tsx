import ModalWrapper from '../modal_wrapper/ModalWrapper';

const ControlledForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div>ControlledForm</div>
    </ModalWrapper>
  );
};

export default ControlledForm;
