import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";

export default function SignedInMenu({ setAuthenticated }) {
  return (
    <MenuItem position='right'>
      <Image avatar spaced='right' src='/assets/user.png' />
      <Dropdown pointing='top left' text='Bob'>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='icon'
          />
          <DropdownItem text='My profile' icon='user' />
          <DropdownItem
            onClick={() => setAuthenticated(false)}
            text='Sign out'
            icon='plus'
          />
        </DropdownMenu>
      </Dropdown>
    </MenuItem>
  );
}
