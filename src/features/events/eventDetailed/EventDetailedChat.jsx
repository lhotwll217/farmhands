import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import {
  Comment,
  CommentAction,
  CommentActions,
  CommentAuthor,
  CommentMetadata,
  CommentGroup,
  CommentText,
  CommentAvatar,
  CommentContent,
  Segment,
  Header,
} from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/firestore/firebaseService";
import { listenToEventChat } from "../eventActions";
import EventDetailedChatForm from "./EventDetailedChatForm";
export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
  });
  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} />
        <CommentGroup>
          {comments?.map((comment) => (
            <Comment key={comment.id}>
              <CommentAvatar src={comment.photoURL || "/assets/user.png"} />
              <CommentContent>
                <CommentAuthor as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </CommentAuthor>
                <CommentMetadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </CommentMetadata>
                <CommentText>{comment.text}</CommentText>
                <CommentActions>
                  <CommentAction>Reply</CommentAction>
                </CommentActions>
              </CommentContent>
            </Comment>
          ))}
        </CommentGroup>
      </Segment>
    </>
  );
}
