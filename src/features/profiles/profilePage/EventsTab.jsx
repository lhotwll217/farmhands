import { useState } from "react";
import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardMeta,
  Grid,
  GridColumn,
  Header,
  Image,
  Tab,
  TabPane,
} from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function EventsTab({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(false);

  const panes = [
    { menuItem: "Future Events", pane: { key: "future" } },
    { menuItem: "Past Events", pane: { key: "past" } },
    { menuItem: "Hosting ", pane: { key: "hosting" } },
  ];

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='calendar' content='Events' />
        </GridColumn>
        <GridColumn width={16}>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <CardGroup itemsPerRow={5} style={{ marginTop: 10 }}>
            <Card as={Link} to={`/events/`}>
              <Image
                src='/assets/categoryImages/drinks.jpg'
                style={{ minHeight: 100, objectFit: "cover" }}
              />
              <CardContent>
                <CardHeader content='Title' textAlign='center' />
                <CardMeta textAlign='center'>
                  <div>Date</div>
                  <div>Time</div>
                </CardMeta>
              </CardContent>
            </Card>
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
