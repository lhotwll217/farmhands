import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import { getUserProfile } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirstoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToCurrentUserProfile } from "../profileActions";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !currentUserProfile) || (!currentUserProfile && !error))
    return <LoadingComponent content='Loading Profile ..' />;
  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader profile={currentUserProfile} />
        <ProfileContent profile={currentUserProfile} />
      </GridColumn>
    </Grid>
  );
}
