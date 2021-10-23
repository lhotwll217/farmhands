import { useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import EventFilters from "./EventFilters";
import { useEffect } from "react";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";
import {
  dataFromSnapshot,
  getEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => {
        dispatch(
          listenToEvents(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        );
        dispatch(asyncActionFinish());
      },
      error: (error) => dispatch(asyncActionError(error)),
      complete: () => console.log("Complete"),
    });
    return unsubscribe;
  }, [dispatch]);

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
