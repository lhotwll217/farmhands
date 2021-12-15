import {useSelector} from "react-redux";
import {Grid, GridColumn} from "semantic-ui-react";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";
import {listenToEventsFromFirestore} from "../../../app/firestore/firestoreService";
import {listenToEvents} from "../eventActions";
import {useDispatch} from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {useState} from "react";
import EventsFeed from "./EventsFeed";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const {events} = useSelector((state) => state.event);
  const {loading} = useSelector((state) => state.async);
  const {authenticated} = useSelector((state) => state.auth);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
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
        {authenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </GridColumn>
    </Grid>
  );
}
