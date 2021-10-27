import { Link } from "react-router-dom";
import {
  ItemImage,
  Segment,
  Item,
  ItemHeader,
  ItemContent,
  ItemGroup,
  Label,
} from "semantic-ui-react";

export default function EventDetailedSidebar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length > 1 ? "People" : "Person"} Going
      </Segment>
      <Segment attached>
        <ItemGroup relaxed divided>
          {attendees.map((attendee) => (
            <Item
              as={Link}
              to={`/profile/${attendee.id}`}
              key={attendee.id}
              style={{ position: "relative" }}
            >
              {hostUid === attendee.id && (
                <Label
                  style={{ position: "absolute" }}
                  color='orange'
                  ribbon='right'
                  content='Host'
                />
              )}
              <ItemImage
                size='tiny'
                src={attendee.photoURL || "/assets/user.png"}
              />
              <ItemContent verticalAlign='middle'>
                <ItemHeader as='h3'>
                  <span>{attendee.displayName}</span>
                </ItemHeader>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </Segment>
    </>
  );
}
