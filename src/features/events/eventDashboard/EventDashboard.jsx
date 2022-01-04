import {useSelector} from "react-redux";
import {Grid, GridColumn, Loader} from "semantic-ui-react";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListPlaceholder";

import {fetchEvents} from "../eventActions";
import {useDispatch} from "react-redux";

import {useState} from "react";
import EventsFeed from "./EventsFeed";
import {useEffect} from "react";
import {RETAIN_STATE} from "../eventConstants";

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {events, moreEvents, filter, startDate, lastVisible, retainState} =
    useSelector((state) => state.event);
  const {loading} = useSelector((state) => state.async);
  const {authenticated} = useSelector((state) => state.auth);

  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({type: RETAIN_STATE});
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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
        <EventFilters loading={loading} />
      </GridColumn>
      <GridColumn width={10}>
        <Loader active={loading} />
      </GridColumn>
    </Grid>
  );
}
