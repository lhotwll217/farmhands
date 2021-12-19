import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Feed, FeedEvent, Header, Segment} from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from "../../../app/firestore/firebaseService";
import {listenToFeed} from "../../profiles/profileActions";
import EventFeedItem from "./EventFeedItem";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const {feed} = useSelector((state) => state.profile);

  useEffect(() => {
    getUserFeedRef().on("value", (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeed(feed));
      return () => {
        getUserFeedRef().off();
      };
    });
  }, [dispatch]);

  return (
    <>
      <Header attached color='teal' icon='newspaper' content='News Feed' />
      <Segment>
        <Feed>
          {feed.map((post) => (
            <EventFeedItem key={post.id} post={post} />
          ))}
        </Feed>
      </Segment>
    </>
  );
}
