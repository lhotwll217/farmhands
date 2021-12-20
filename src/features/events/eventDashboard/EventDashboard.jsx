import {useSelector} from "react-redux";
import {Grid, GridColumn, Loader} from "semantic-ui-react";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";

import {clearEvents, fetchEvents, listenToEvents} from "../eventActions";
import {useDispatch} from "react-redux";

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
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapshot(lastVisible);
      }
    );
  }

  function handleSetPredicate(key, value) {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
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
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
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
      <GridColumn width={10}>
        <Loader active={loading} />
      </GridColumn>
    </Grid>
  );
}
