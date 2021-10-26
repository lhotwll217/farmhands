import { Tab, TabPane } from "semantic-ui-react";

export default function ProfileContent() {
  const panes = [
    { menuItem: "About", render: () => <TabPane>About User</TabPane> },
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
