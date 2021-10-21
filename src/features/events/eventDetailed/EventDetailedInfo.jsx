import {
  SegmentGroup,
  Segment,
  Button,
  Grid,
  Icon,
  GridColumn,
} from "semantic-ui-react";
import { format } from "date-fns";

export default function EventDetailedInfo({ event }) {
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
            <span>{event.venue}</span>
          </GridColumn>
          <GridColumn width={4}>
            <Button color='teal' size='tiny' content='Show Map' />
          </GridColumn>
        </Grid>
      </Segment>
    </SegmentGroup>
  );
}
