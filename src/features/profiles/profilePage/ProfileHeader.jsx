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

export default function ProfileHeader() {
  return (
    <Segment>
      <Grid>
        <GridColumn width={12}>
          <ItemGroup>
            <Item>
              <ItemImage avater size='small' src='/assets/user.png' />
              <ItemContent verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content='Display Name'
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
          <Divider />
          <Reveal animated='move'>
            <RevealContent visible style={{ width: "100%" }}>
              <Button fluid color='teal' content='Following' />
            </RevealContent>
            <RevealContent hidden style={{ width: "100%" }}>
              <Button basic fluid color='red' content='Unfollow' />
            </RevealContent>
          </Reveal>
        </GridColumn>
      </Grid>
    </Segment>
  );
}
