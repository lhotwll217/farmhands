import {
  CardGroup,
  Grid,
  GridColumn,
  Header,
  TabPane,
} from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

export default function FollowingTab({ profile }) {
  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='user' content='Followers' />
        </GridColumn>
        <GridColumn width={16}>
          <CardGroup itemsPerRow={5}>
            <ProfileCard profile={profile} />
            <ProfileCard profile={profile} />
            <ProfileCard profile={profile} />
            <ProfileCard profile={profile} />
            <ProfileCard profile={profile} />
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
