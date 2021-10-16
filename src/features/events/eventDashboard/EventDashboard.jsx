import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";

export default function EventDashboard() {
  return (
    <Grid>
      <GridColumn width={10}>
        <EventList />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Right Column</h2>
      </GridColumn>
    </Grid>
  );
}
