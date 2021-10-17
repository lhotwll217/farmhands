import { Grid, GridColumn } from "semantic-ui-react";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";
import { sampleData } from "../../../app/api/sampleData";
import { useState } from "react";

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectedEvent,
  selectEvent,
}) {
  const [events, setEvents] = useState(sampleData);

  console.log(events);

  function handleCreateEvent(event) {
    setEvents([...events, event]);
  }

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} selectEvent={selectEvent} />
      </GridColumn>
      <GridColumn width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </GridColumn>
    </Grid>
  );
}
