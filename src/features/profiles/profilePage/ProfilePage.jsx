import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirstoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToSelectedUserProfile } from "../profileActions";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoadingComponent content='Loading Profile ..' />;
  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
          profile={selectedUserProfile}
        />
        <ProfileContent
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
          profile={selectedUserProfile}
        />
      </GridColumn>
    </Grid>
  );
}
