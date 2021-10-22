import { useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import EventFilters from "./EventFilters";

import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  return (
    <Grid>
      <GridColumn width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </GridColumn>
      <GridColumn width={6}>
        <EventFilters />
      </GridColumn>
    </Grid>
  );
}
