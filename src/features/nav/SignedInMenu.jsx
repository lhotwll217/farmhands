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
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <MenuItem position='right'>
      <Image avatar spaced='right' src='/assets/user.png' />
      <Dropdown pointing='top left' text={currentUser.displayName}>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <DropdownItem
            text='My Account'
            icon='settings'
            as={Link}
            to='/account'
          />
          <DropdownItem
            text='My Profile'
            icon='user'
            as={Link}
            to={`/profile/${currentUser.uid}`}
          />
          <DropdownItem onClick={handleSignOut} text='Sign out' icon='plus' />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
}
