import { useDispatch } from "react-redux";
import { ModalHeader, ModalContent, Modal } from "semantic-ui-react";
import { closeModal } from "./modalReducer";

export default function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
