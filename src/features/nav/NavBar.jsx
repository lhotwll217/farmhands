import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignout() {
    setAuthenticated(false);
    history.push("/");
  }
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
        {authenticated && (
          <MenuItem as={NavLink} to='/createEvent'>
            <Button
              onClick={() => setFormOpen(true)}
              positive
              inverted
              content='Create Event'
            />
          </MenuItem>
        )}

        <MenuItem float='right'>
          {authenticated ? (
            <SignedInMenu signOut={handleSignout} />
          ) : (
            <SignedOutMenu setAuthenticated={setAuthenticated} />
          )}
        </MenuItem>
      </Container>
    </Menu>
  );
}
