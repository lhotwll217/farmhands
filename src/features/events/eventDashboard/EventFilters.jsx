import { Header, Menu, MenuItem } from "semantic-ui-react";
import Calendar from "react-calendar";

export default function EventFilters({ setPredicate, predicate, loading }) {
  return (
    <>
      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <MenuItem
          content='All Events'
          active={predicate.get("filter") === "all"}
          onClick={() => setPredicate("filter", "all")}
          disabled={loading}
        />
        <MenuItem
          content='Going'
          active={predicate.get("filter") === "isGoing"}
          onClick={() => setPredicate("filter", "isGoing")}
          disabled={loading}
        />
        <MenuItem
          content='Hosting'
          active={predicate.get("filter") === "isHost"}
          onClick={() => setPredicate("filter", "isHost")}
          disabled={loading}
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select Date' />
      <Calendar
        onChange={(date) => setPredicate("startDate", date)}
        value={predicate.get("startDate") || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
