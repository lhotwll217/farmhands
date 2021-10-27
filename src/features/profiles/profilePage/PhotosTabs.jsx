import { useState } from "react";
import {
  Button,
  CardGroup,
  Card,
  Grid,
  GridColumn,
  Header,
  Image,
  TabPane,
  ButtonGroup,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";

export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <CardGroup itemsPerRow={5}>
              <Card>
                <Image src={"/assets/user.png"} />
                <ButtonGroup fluid widths={2}>
                  <Button basic color='green' content='Main' />
                  <Button basic color='red' icon='trash' />
                </ButtonGroup>
              </Card>
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
