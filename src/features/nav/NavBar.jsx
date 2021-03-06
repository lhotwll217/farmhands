import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar() {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Menu inverted fixed='top'>
      <Container>
        <MenuItem header as={NavLink} exact to='/'>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: "15px" }}
          />
          Re-vents
        </MenuItem>
        <MenuItem as={NavLink} to='/events' name='Events' />
        <MenuItem as={NavLink} to='/sandbox' name='sandbox' />
        {authenticated && (
          <MenuItem as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </MenuItem>
        )}

        <MenuItem float='right'>
          {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
        </MenuItem>
      </Container>
    </Menu>
  );
}
