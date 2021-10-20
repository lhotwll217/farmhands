import { Header, Segment, Button } from "semantic-ui-react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a description"),
    city: Yup.string().required("You must provide a city"),
    venue: Yup.string().required("You must provide a venue"),
    date: Yup.string().required("You must provide a date"),
  });

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit The Event" : "Create New Event"} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
        }}
        validationSchema={validationSchema}
      >
        <Form className='ui form'>
          <Header sub color='teal' content='Event Details' />
          <MyTextInput placeholder='Event Title' name='title' />

          <MyTextInput placeholder='Category' name='category' />

          <MyTextArea placeholder='Description' name='description' rows={3} />
          <Header sub color='teal' content='Event Location Details' />
          <MyTextInput placeholder='City' name='city' />

          <MyTextInput placeholder='Venue' name='venue' />

          <MyTextInput placeholder='Date' name='date' type='date' />

          <Button type='submit' floated='right' positive content='Submit' />
          <Button
            as={Link}
            to={"/events"}
            type='submit'
            floated='right'
            content='Cancel'
          />
        </Form>
      </Formik>
    </Segment>
  );
}
