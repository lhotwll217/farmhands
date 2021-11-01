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
import { CLEAR_COMMENTS } from "../eventConstants";
import { useState } from "react";
export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }
  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val())?.reverse())
      );
      return () => {
        dispatch({ type: CLEAR_COMMENTS });
        getEventChatRef().off();
      };
    });
  }, [eventId, dispatch]);
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
        <EventDetailedChatForm parentId={0} eventId={eventId} />
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
                  <CommentAction
                    onClick={() =>
                      setShowReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Reply
                  </CommentAction>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        parentId={comment.id}
                        closeForm={handleCloseReplyForm}
                      />
                    )}
                </CommentActions>
              </CommentContent>
            </Comment>
          ))}
        </CommentGroup>
      </Segment>
    </>
  );
}
