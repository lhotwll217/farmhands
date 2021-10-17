import EventListItem from "./EventListItem";

export default function EventList({ events, selectEvent }) {
  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} selectEvent={selectEvent} />
      ))}
    </>
  );
}
