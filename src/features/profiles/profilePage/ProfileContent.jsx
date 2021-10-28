import { Tab, TabPane } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import EventsTab from "./EventsTab";
import PhotosTab from "./PhotosTabs";

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: "Events", render: () => <EventsTab /> },
    { menuItem: "Followers", render: () => <TabPane>Followers User</TabPane> },
    { menuItem: "Following", render: () => <TabPane>Following User</TabPane> },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
}
