import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
import { getUserPhotos } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToUserPhotos } from "../profileActions";

export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  return (
    <TabPane loading={loading}>
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
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <ButtonGroup fluid widths={2}>
                    <Button basic color='green' content='Main' />
                    <Button basic color='red' icon='trash' />
                  </ButtonGroup>
                </Card>
              ))}
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
