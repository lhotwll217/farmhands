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
import { useSelector } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { getUserEventsQuery } from "../../../app/firestore/firestoreService";
import { useDispatch } from "react-redux";
import { listenToUserEvents } from "../profileActions";

export default function EventsTab({ profile }) {
  const [activeTab, setActiveTab] = useState(false);
  const { profileEvents } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [profile.id, activeTab, dispatch],
  });

  const panes = [
    { menuItem: "Future Events", pane: { key: "future" } },
    { menuItem: "Past Events", pane: { key: "past" } },
    { menuItem: "Hosting ", pane: { key: "hosting" } },
  ];

  return (
    <TabPane loading={loading}>
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
            {profileEvents.map((event) => (
              <Card key={event.id} as={Link} to={`/events/${event.id}`}>
                <Image
                  src={`/assets/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <CardContent>
                  <CardHeader content={event.title} textAlign='center' />
                  <CardMeta textAlign='center'>
                    <div>{format(event.date, "dd MMM yyyy")}</div>
                    <div>{format(event.date, "hh:mm a")}</div>
                  </CardMeta>
                </CardContent>
              </Card>
            ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}
