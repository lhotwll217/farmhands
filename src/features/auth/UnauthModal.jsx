import {useState} from "react";
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

export default function UnauthModal({history}) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  function handleClose() {
    history.goBack();
    setOpen(false);
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
            onClick={() => dispatch(openModal({modalType: "LoginForm"}))}
          />
          <ButtonOr />
          <Button
            fluid
            color='green'
            content='Register'
            onClick={() => dispatch(openModal({modalType: "RegisterForm"}))}
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
