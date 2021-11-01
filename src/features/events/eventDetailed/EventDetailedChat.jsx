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
import { createDataTree } from "../../../app/common/util/util";
export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const { authenticated } = useSelector((state) => state.auth);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    return () => {
      dispatch({ type: CLEAR_COMMENTS });
      getEventChatRef().off();
    };
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
        <Header>
          {authenticated
            ? "Chat about this event"
            : "Sign in to view and comment"}
        </Header>
      </Segment>

      {authenticated && (
        <Segment attached>
          <EventDetailedChatForm
            eventId={eventId}
            parentId={0}
            closeForm={setShowReplyForm}
          />
          <CommentGroup>
            {createDataTree(comments).map((comment) => (
              <Comment key={comment.id}>
                <CommentAvatar src={comment.photoURL || "/assets/user.png"} />
                <CommentContent>
                  <CommentAuthor as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </CommentAuthor>
                  <CommentMetadata>
                    <div>{formatDistance(comment.date, new Date())}</div>
                  </CommentMetadata>
                  <CommentText>
                    {comment.text.split("\n").map((text, i) => (
                      <span key={i}>
                        {text}
                        <br />
                      </span>
                    ))}
                  </CommentText>
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
                {comment.childNodes.length > 0 && (
                  <CommentGroup>
                    {comment.childNodes.reverse().map((child) => (
                      <Comment key={child.id}>
                        <Comment.Avatar
                          src={child.photoURL || "/assets/user.png"}
                        />
                        <CommentContent>
                          <CommentAuthor as={Link} to={`/profile/${child.uid}`}>
                            {child.displayName}
                          </CommentAuthor>
                          <CommentMetadata>
                            <div>{formatDistance(child.date, new Date())}</div>
                          </CommentMetadata>
                          <CommentText>
                            {child.text.split("\n").map((text, i) => (
                              <span key={i}>
                                {text}
                                <br />
                              </span>
                            ))}
                          </CommentText>
                          <CommentActions>
                            <CommentAction
                              onClick={() =>
                                setShowReplyForm({
                                  open: true,
                                  commentId: child.id,
                                })
                              }
                            >
                              Reply
                            </CommentAction>
                            {showReplyForm.open &&
                              showReplyForm.commentId === child.id && (
                                <EventDetailedChatForm
                                  eventId={eventId}
                                  parentId={child.parentId}
                                  closeForm={handleCloseReplyForm}
                                />
                              )}
                          </CommentActions>
                        </CommentContent>
                      </Comment>
                    ))}
                  </CommentGroup>
                )}
              </Comment>
            ))}
          </CommentGroup>
        </Segment>
      )}
    </>
  );
}
