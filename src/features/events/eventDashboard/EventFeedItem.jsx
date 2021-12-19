import {Link} from "react-router-dom";
import {
  FeedContent,
  FeedDate,
  FeedEvent,
  FeedLabel,
  FeedSummary,
} from "semantic-ui-react";
import {formatDistance} from "date-fns";

export default function EventFeedItem({post}) {
  let summary;
  switch (post.code) {
    case "joined-event":
      summary = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has
          signed up to <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    case "left-event":
      summary = (
        <>
          <Link to={`/profile/${post.userUid}`}>{post.displayName}</Link> has
          cancelled <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    default:
      summary = "something happened";
      break;
  }

  return (
    <FeedEvent>
      <FeedLabel image={post.photoUrl} />
      <FeedContent>
        <FeedDate>
          {formatDistance(new Date(post.date), new Date())} ago
        </FeedDate>
        <FeedSummary>{summary}</FeedSummary>
      </FeedContent>
    </FeedEvent>
  );
}
