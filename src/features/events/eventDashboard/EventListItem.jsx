import {
  Icon,
  ItemDescription,
  Item,
  ItemContent,
  ItemGroup,
  ItemHeader,
  ItemImage,
  Segment,
  SegmentGroup,
  List,
  Button,
  Label,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { deleteEventInFirestore } from "../../../app/firestore/firestoreService";

export default function EventListItem({ event }) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage size='tiny' circular src={event.hostPhotoURL} />
            <ItemContent>
              <ItemHeader content={event.title} />
              <ItemDescription>
                Hosted By{" "}
                <Link to={`/profiles/${event.hostUid}`}>{event.hostedBy}</Link>
              </ItemDescription>
              {event.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, "MMMM d, yyyy h:mm a")}
          <Icon name='marker' /> {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees?.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div> {event.description}</div>
        <Button
          onClick={() => deleteEventInFirestore(event.id)}
          color='red'
          content='Delete'
          floated='right'
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </SegmentGroup>
  );
}
