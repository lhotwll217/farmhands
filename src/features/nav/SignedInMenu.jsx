import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);

  async function handleSignOut() {
    try {
      await signOutFirebase();
      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <MenuItem position='right'>
      <Image avatar spaced='right' src='/assets/user.png' />
      <Dropdown pointing='top left' text={currentUser.email}>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <DropdownItem text='My profile' icon='user' />
          <DropdownItem
            text='My Account'
            icon='settings'
            as={Link}
            to='/account'
          />
          <DropdownItem onClick={handleSignOut} text='Sign out' icon='plus' />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
}
