import ModalWrapper from '../modal_wrapper/ModalWrapper';

const UnControlledForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div>UnControlledForm</div>
    </ModalWrapper>
  );
};

export default UnControlledForm;
