import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  GridColumn,
  Grid,
  Item,
  ItemGroup,
  ItemImage,
  Segment,
  ItemContent,
  Header,
  StatisticGroup,
  Statistic,
  Divider,
  Reveal,
  RevealContent,
  Button,
} from "semantic-ui-react";
import {
  followUser,
  getFollowingDoc,
  unfollowUser,
} from "../../../app/firestore/firestoreService";
import { setFollowUser, setUnfollowUser } from "../profileActions";
import { CLEAR_FOLLOWINGS } from "../profileConstants";

export default function ProfileHeader({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFollowingDoc().then(() => setLoading(false));
    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS });
    };
  }, [isCurrentUser, dispatch, profile.id]);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleUnfollowUser() {
    setLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(setUnfollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <GridColumn width={12}>
          <ItemGroup>
            <Item>
              <ItemImage
                avatar
                size='small'
                src={profile.photoURL || "/assets/user.png"}
              />
              <ItemContent verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </ItemContent>
            </Item>
          </ItemGroup>
        </GridColumn>
        <GridColumn width={4}>
          <StatisticGroup>
            <Statistic label='followers' value={profile.followerCount || 0} />
            <Statistic label='following' value={profile.followingCount || 0} />
          </StatisticGroup>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <RevealContent visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color='teal'
                    content={followingUser ? "Following" : "Not Following"}
                  />
                </RevealContent>
                <RevealContent hidden style={{ width: "100%" }}>
                  <Button
                    onClick={
                      followingUser
                        ? () => handleUnfollowUser()
                        : () => handleFollowUser()
                    }
                    loading={loading}
                    basic
                    fluid
                    color={followingUser ? "red" : "green"}
                    content={followingUser ? "Unfollow" : "Follow"}
                  />
                </RevealContent>
              </Reveal>
            </>
          )}
        </GridColumn>
      </Grid>
    </Segment>
  );
}
