import {useSelector} from "react-redux";
import {Button, Grid, GridColumn} from "semantic-ui-react";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";
import {listenToEventsFromFirestore} from "../../../app/firestore/firestoreService";
import {fetchEvents, listenToEvents} from "../eventActions";
import {useDispatch} from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {useState} from "react";
import EventsFeed from "./EventsFeed";
import {useEffect} from "react";

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {events, moreEvents} = useSelector((state) => state.event);
  const {loading} = useSelector((state) => state.async);
  const {authenticated} = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapshot(lastVisible);
      }
    );
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  return (
    <Grid>
      <GridColumn width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
        <Button
          loading={loading}
          disabled={!moreEvents}
          onClick={handleFetchNextEvents}
          color='green'
          content='More...'
          floated='right'
        />
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
