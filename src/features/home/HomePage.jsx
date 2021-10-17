import { useHistory } from "react-router";
import {
  Icon,
  Button,
  Container,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign='center' className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            style={{ marginBottom: 12 }}
          />
          Re-vents
        </Header>
        <Button onClick={() => history.push("/events")} size='huge' inverted>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    </Segment>
  );
}
