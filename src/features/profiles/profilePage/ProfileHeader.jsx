import { useState } from "react";
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
import { followUser } from "../../../app/firestore/firestoreService";

export default function ProfileHeader({ profile, isCurrentUser }) {
  const [loading, setLoading] = useState(false);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
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
            <Statistic label='followers' value={10} />
            <Statistic label='following' value={5} />
          </StatisticGroup>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <RevealContent visible style={{ width: "100%" }}>
                  <Button fluid color='teal' content='Following' />
                </RevealContent>
                <RevealContent hidden style={{ width: "100%" }}>
                  <Button
                    onClick={handleFollowUser}
                    loading={loading}
                    basic
                    fluid
                    color='green'
                    content='Follow'
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
