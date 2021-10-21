import {
  SegmentGroup,
  Segment,
  Button,
  Grid,
  Icon,
  GridColumn,
} from "semantic-ui-react";
import { format } from "date-fns";
import EventDetailedMap from "./EventDetailedMap";
import { useState } from "react";

export default function EventDetailedInfo({ event }) {
  const [mapOpen, toggleOpenMap] = useState(false);

  return (
    <SegmentGroup>
      <Segment attached='top'>
        <Grid>
          <GridColumn width={1}>
            <Icon size='large' color='teal' name='info' />
          </GridColumn>
          <GridColumn width={15}>
            <p>{event.description}</p>
          </GridColumn>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <GridColumn width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </GridColumn>
          <GridColumn width={15}>
            <span>{format(event.date, "MMMM d, yyyy h:mm a")}</span>
          </GridColumn>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <GridColumn width={1}>
            <Icon name='marker' size='large' color='teal' />
          </GridColumn>
          <GridColumn width={11}>
            <span>{event.venue.address}</span>
          </GridColumn>
          <GridColumn width={4}>
            <Button
              onClick={() => toggleOpenMap(!mapOpen)}
              color='teal'
              size='tiny'
              content={mapOpen ? "Hide Map" : "Open Map"}
            />
          </GridColumn>
        </Grid>
      </Segment>
      {mapOpen && <EventDetailedMap latLng={event.venue.latlng} />}
    </SegmentGroup>
  );
}
