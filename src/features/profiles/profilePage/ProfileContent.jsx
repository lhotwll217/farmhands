import { Tab, TabPane } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";
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
    { menuItem: "Events", render: () => <EventsTab profile={profile} /> },
    { menuItem: "Followers", render: () => <FollowingTab profile={profile} /> },
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
