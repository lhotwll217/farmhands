import {useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {
  Button,
  ButtonGroup,
  ButtonOr,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import {openModal} from "../../app/common/form/modals/modalReducer";

export default function UnauthModal({history, setModalOpen}) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const {prevLocation} = useSelector((state) => state.auth);

  function handleClose() {
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push("/events");
    }
    setOpen(false);
  }

  function handleOpenLoginModal(modalType) {
    dispatch(openModal({modalType}));
    setOpen(false);
    setModalOpen(false);
  }
  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <ModalHeader content='You need to be signed in to do that' />
      <ModalContent>
        <p>Please either login or register to see this content</p>
        <ButtonGroup widths={4}>
          <Button
            fluid
            color='teal'
            content='Login'
            onClick={() => handleOpenLoginModal("LoginForm")}
          />
          <ButtonOr />
          <Button
            fluid
            color='green'
            content='Register'
            onClick={() => handleOpenLoginModal("RegisterForm")}
          />
        </ButtonGroup>
        <Divider />
        <div style={{textAlign: "center"}}>
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleClose} content='cancel' />
        </div>
      </ModalContent>
    </Modal>
  );
}
