import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { signOutUser } from "../auth/authActions";

export default function SignedInMenu() {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
            onClick={() => {
              dispatch(signOutUser());
              history.push("/");
            }}
            text='Sign out'
            icon='plus'
          />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
}
