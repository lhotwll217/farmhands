import { Header, Segment, FormField, Button, Label } from "semantic-ui-react";
// import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
  });

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  // function handleFormSubmit() {
  //   selectedEvent
  //     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
  //     : dispatch(
  //         createEvent({
  //           ...values,
  //           id: cuid(),
  //           hostedBy: "Bob",
  //           attendees: [],
  //           hostPhotoURL: "/assets/user.png",
  //         })
  //       );
  //   history.push("/events");
  // }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit The Event" : "Create New Event"} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <Form className='ui form'>
          <FormField>
            <Field placeholder='Event Title' name='title' />
            <ErrorMessage
              name='title'
              render={(error) => <Label basic color='red' content={error} />}
            />
          </FormField>
          <FormField>
            <Field placeholder='Category' name='category' />
          </FormField>
          <FormField>
            <Field placeholder='Description' name='description' />
          </FormField>
          <FormField>
            <Field placeholder='City' name='city' />
          </FormField>
          <FormField>
            <Field placeholder='Venue' name='venue' />
          </FormField>
          <FormField>
            <Field placeholder='Date' name='date' type='date' />
          </FormField>

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
