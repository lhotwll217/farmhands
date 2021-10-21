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
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../eventActions";
import { format } from "date-fns";

export default function EventListItem({ event }) {
  const dispatch = useDispatch();
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage size='tiny' circular src={event.hostPhotoURL} />
            <ItemContent>
              <ItemHeader content={event.title} />
              <ItemDescription>Hosted By {event.hostedBy}</ItemDescription>
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
          onClick={() => dispatch(deleteEvent(event.id))}
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
