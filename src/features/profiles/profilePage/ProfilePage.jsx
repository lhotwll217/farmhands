import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Grid, GridColumn} from "semantic-ui-react";
import {getUserProfile} from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirstoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {listenToSelectedUserProfile} from "../profileActions";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage({match}) {
  const dispatch = useDispatch();
  const {selectedUserProfile, currentUserProfile} = useSelector(
    (state) => state.profile
  );
  const {currentUser} = useSelector((state) => state.auth);
  const {loading, error} = useSelector((state) => state.async);
  let profile;

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  });

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content='Loading Profile ..' />;
  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader
          isCurrentUser={currentUser.uid === profile.id}
          profile={profile}
        />
        <ProfileContent
          isCurrentUser={currentUser.uid === profile.id}
          profile={profile}
        />
      </GridColumn>
    </Grid>
  );
}
