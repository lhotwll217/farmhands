import { Grid, GridColumn } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader />
        <h2>Profile Content</h2>
      </GridColumn>
    </Grid>
  );
}
