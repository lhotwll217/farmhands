import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, Image } from "semantic-ui-react";

export default function ProfileCard({ profile }) {
  return (
    <Card as={Link} to={`/profile/${profile.id}`}>
      <Image src={profile.photoURL || `/assets/user.png`} />
      <CardContent>
        <CardHeader content={profile.displayName} />
      </CardContent>
    </Card>
  );
}
