import {
  ItemImage,
  Segment,
  Item,
  ItemHeader,
  ItemContent,
  ItemGroup,
} from "semantic-ui-react";

export default function EventDetailedSidebar({ attendees }) {
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
            <Item key={attendee.id} style={{ position: "relative" }}>
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
