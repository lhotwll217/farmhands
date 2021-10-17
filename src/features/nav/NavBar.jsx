import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

export default function NavBar({ setFormOpen }) {
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
        <MenuItem as={NavLink} to='/createEvent'>
          <Button
            onClick={() => setFormOpen(true)}
            positive
            inverted
            content='Create Event'
          />
        </MenuItem>
        <MenuItem>
          <Button basic inverted content='Login' />
          <Button
            basic
            inverted
            content='Register'
            style={{ marginLeft: ".5em" }}
          />
        </MenuItem>
      </Container>
    </Menu>
  );
}
