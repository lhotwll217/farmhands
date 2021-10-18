import {
  SegmentGroup,
  Segment,
  Button,
  Grid,
  Icon,
  GridColumn,
} from "semantic-ui-react";

export default function EventDetailedInfo() {
  return (
    <SegmentGroup>
      <Segment attached='top'>
        <Grid>
          <GridColumn width={1}>
            <Icon size='large' color='teal' name='info' />
          </GridColumn>
          <GridColumn width={15}>
            <p>Event Description</p>
          </GridColumn>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <GridColumn width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </GridColumn>
          <GridColumn width={15}>
            <span>Event Date</span>
          </GridColumn>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <GridColumn width={1}>
            <Icon name='marker' size='large' color='teal' />
          </GridColumn>
          <GridColumn width={11}>
            <span>Event Venue</span>
          </GridColumn>
          <GridColumn width={4}>
            <Button color='teal' size='tiny' content='Show Map' />
          </GridColumn>
        </Grid>
      </Segment>
    </SegmentGroup>
  );
}
