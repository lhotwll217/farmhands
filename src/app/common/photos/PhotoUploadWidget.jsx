import { Grid, GridColumn, Header } from "semantic-ui-react";

export default function PhotoUploadWidget() {
  return (
    <Grid>
      <GridColumn width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo' />
      </GridColumn>
      <GridColumn width={1} />
      <GridColumn width={4}>
        <Header color='teal' sub content='Step 2 - Resize' />
      </GridColumn>
      <GridColumn width={1} />
      <GridColumn width={4}>
        <Header color='teal' sub content='Step 3 - Preview & Upload' />
      </GridColumn>
      <GridColumn width={1} />
    </Grid>
  );
}
