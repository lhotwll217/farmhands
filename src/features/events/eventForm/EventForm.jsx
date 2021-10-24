/* global google */
import { Header, Segment, Button } from "semantic-ui-react";
import cuid from "cuid";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createEvent, listenToEvents, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput.jsx";
import MyDateInput from "../../../app/common/form/MyDateInput.jsx";
import { categoryOptions } from "../../../app/common/form/categoryOptions.js";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/useFirstoreDoc";
import {
  addEventToFirestore,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a category"),
    city: Yup.object().shape({
      address: Yup.string().required("You must provide a description"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("You must provide a venue"),
    }),
    date: Yup.string().required("You must provide a date"),
  });

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id],
  });

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: { address: "", latLng: null },
    venue: { address: "", latLng: null },
    date: "",
  };

  if (loading || (!selectedEvent && !error))
    return <LoadingComponent content='Loading event ...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit The Event" : "Create New Event"} />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />
            <MyTextInput placeholder='Event Title' name='title' />
            <MySelectInput
              placeholder='Category'
              name='category'
              options={categoryOptions}
            />

            <MyTextArea placeholder='Description' name='description' rows={3} />

            <Header sub color='teal' content='Event Location Details' />
            <MyPlaceInput placeholder='City' name='city' />

            <MyPlaceInput
              placeholder='Venue'
              name='venue'
              disabled={!values.city.latLng}
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 100,
                types: ["establishment"],
              }}
            />

            <MyDateInput
              name='date'
              isClearable={true}
              placeholderText='Event Date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <Button
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
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
