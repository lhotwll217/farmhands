import { Link } from "react-router-dom";
import {
  SegmentGroup,
  Segment,
  ItemGroup,
  Item,
  Button,
  Header,
  ItemContent,
  Image,
} from "semantic-ui-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../../app/firestore/firestoreService";
import { useState } from "react";

// const eventImageStyle = {
//   filter: "brightness(30%)",
// };

// const eventImageTextStyle = {
//   position: "absolute",
//   bottom: "5%",
//   left: "5%",
//   width: "100%",
//   height: "auto",
//   color: "white",
// };

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false);

  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SegmentGroup>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={{ filter: "brightness(30%)" }}
        />

        <Segment
          basic
          style={{
            position: "absolute",
            bottom: "5%",
            left: "5%",
            width: "100%",
            height: "auto",
            color: "white",
          }}
        >
          <ItemGroup>
            <Item>
              <ItemContent>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profile/${event.hostUid}`}></Link>
                    {event.hostedBy}
                  </strong>
                </p>
              </ItemContent>
            </Item>
          </ItemGroup>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {!isHost && (
          <>
            {isGoing ? (
              <Button onClick={handleUserLeaveEvent} loading={loading}>
                Cancel My Place
              </Button>
            ) : (
              <Button onClick={handleUserJoinEvent} loading={loading}>
                Join Event
              </Button>
            )}
          </>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </SegmentGroup>
  );
}
