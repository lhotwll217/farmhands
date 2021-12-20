import {GridColumn, Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {useDispatch, useSelector} from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirstoreDoc";
import {listenToEventFromFirestore} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {listenToSelectedEvent} from "../eventActions";
import {Redirect} from "react-router";

export default function EventDetailedPage({match}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.auth);
  const event = useSelector((state) => state.event.selectedEvent);
  const {loading, error} = useSelector((state) => state.async);
  const isHost = event?.hostUid === currentUser.uid;
  const isGoing = event?.attendees?.some((a) => a.id === currentUser.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content='Loading event ...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </GridColumn>
      <GridColumn width={6}>
        <EventDetailedSidebar
          attendees={event?.attendees}
          hostUid={event.hostUid}
        />
      </GridColumn>
    </Grid>
  );
}
