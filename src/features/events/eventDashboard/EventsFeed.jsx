import {Feed, FeedEvent, Header, Segment} from "semantic-ui-react";

export default function EventsFeed() {
  const image = "/assets/user.png";
  const date = "3 days ago";
  const summary = "Diana joined an event";

  return (
    <>
      <Header attached color='teal' icon='newspaper' content='News Feed' />
      <Segment>
        <Feed>
          <FeedEvent image={image} date={date} summary={summary} />
          <FeedEvent image={image} date={date} summary={summary} />
          <FeedEvent image={image} date={date} summary={summary} />
          <FeedEvent image={image} date={date} summary={summary} />
        </Feed>
      </Segment>
    </>
  );
}
