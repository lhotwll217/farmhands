import { useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventList from "./EventList";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  if (loading) return <LoadingComponent />;

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
