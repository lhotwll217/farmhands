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
    <Segment
      style={{ marginTop: 0 }}
      inverted
      textAlign='center'
      className='masthead'
    >
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
          <Icon name='arrow right' inverted />
        </Button>
      </Container>
    </Segment>
  );
}
