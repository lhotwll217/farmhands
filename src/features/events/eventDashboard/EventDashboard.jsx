import { Grid, GridColumn } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";

export default function EventDashboard() {
  return (
    <Grid>
      <GridColumn width={10}>
        <EventList />
      </GridColumn>
      <GridColumn width={6}>
        <EventForm />
      </GridColumn>
    </Grid>
  );
}
