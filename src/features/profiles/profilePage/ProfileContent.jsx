import { Tab, TabPane } from "semantic-ui-react";
import AboutTab from "./AboutTab";

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: "Photos", render: () => <TabPane>Photos</TabPane> },
    { menuItem: "Events", render: () => <TabPane>Events User</TabPane> },
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
