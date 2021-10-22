import { Header, Menu, MenuItem } from "semantic-ui-react";
import Calendar from "react-calendar";

export default function EventFilters() {
  return (
    <>
      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <MenuItem content='All Events' />
        <MenuItem content='Going' />
        <MenuItem content='Hosting' />
      </Menu>
      <Header icon='Calendar' attached color='teal' content='Select Date' />
      <Calendar />
    </>
  );
}
