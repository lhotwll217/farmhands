import { useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import EventFilters from "./EventFilters";
import { useEffect } from "react";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";
import { getEventsFromFirestore } from "../../../app/firestore/firestoreService";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) =>
        console.log(snapshot.docs.map((docSnapshot) => docSnapshot.data())),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  });

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
