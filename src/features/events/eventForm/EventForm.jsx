import { Header, Segment, Form, FormField, Button } from "semantic-ui-react";
import { useState } from "react";
// import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { Formik } from "formik";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

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

  // function handleInputChange(e) {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // }
  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit The Event" : "Create New Event"} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormField>
              <input
                type='text'
                placeholder='Event Title'
                name='title'
                value={values.title}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <input
                type='text'
                placeholder='Category'
                name='category'
                value={values.category}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <input
                type='text'
                placeholder='Description'
                name='description'
                value={values.description}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <input
                type='text'
                placeholder='City'
                name='city'
                value={values.city}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <input
                type='text'
                placeholder='Venue'
                name='venue'
                value={values.venue}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <input
                type='date'
                placeholder='Date'
                name='date'
                value={values.date}
                onChange={handleChange}
              />
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
        )}
      </Formik>
    </Segment>
  );
}
