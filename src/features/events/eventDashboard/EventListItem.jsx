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

export default function EventListItem() {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage size='tiny' circular src='/assets/user.png' />
            <ItemContent>
              <ItemHeader content='Event Title' />
              <ItemDescription>Hosted By Bob</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> Date
          <Icon name='marker' /> Venue
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          <EventListAttendee />
          <EventListAttendee />
          <EventListAttendee />
        </List>
      </Segment>
      <Segment clearing>
        <div> Description of event</div>
        <Button color='teal' floated='right' content='View' />
      </Segment>
    </SegmentGroup>
  );
}
