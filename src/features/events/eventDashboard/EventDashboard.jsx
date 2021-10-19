import { useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>EventFilters</h2>
      </GridColumn>
    </Grid>
  );
}
