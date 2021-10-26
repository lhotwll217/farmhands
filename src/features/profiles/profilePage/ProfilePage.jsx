import { Grid, GridColumn } from "semantic-ui-react";
import ProfileContent from "./ProfilContent";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader />
        <ProfileContent />
      </GridColumn>
    </Grid>
  );
}
