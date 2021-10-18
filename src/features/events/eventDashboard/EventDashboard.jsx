import { useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);

  console.log(events);

  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }

  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  //   selectEvent(null);
  // }

  function handleDeleteEvent(eventId) {}

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </GridColumn>
      <GridColumn width={6}>
        <h2>EventFilters</h2>)
      </GridColumn>
    </Grid>
  );
}
