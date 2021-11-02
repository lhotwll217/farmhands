import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  CardGroup,
  Grid,
  GridColumn,
  Header,
  TabPane,
} from "semantic-ui-react";
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToFollowers, listenToFollowings } from "../profileActions";
import ProfileCard from "./ProfileCard";

export default function FollowingTab({ profile, activeTab }) {
  const dispatch = useDispatch();
  const { followings, followers } = useSelector((state) => state.profile);

  useFirestoreCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data) =>
      activeTab === 3
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [activeTab, dispatch],
  });
  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header
            floated='left'
            icon='user'
            content={activeTab === 3 ? "Followers" : "Followings"}
          />
        </GridColumn>
        <GridColumn width={16}>
          <CardGroup itemsPerRow={5}>
            {activeTab === 3 &&
              followers.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 4 &&
              followings.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
