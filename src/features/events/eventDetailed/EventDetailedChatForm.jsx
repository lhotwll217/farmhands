import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { addEventChatComment } from "../../../app/firestore/firebaseService";

export default function EventDetailedChatForm({ eventId }) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, values.comment);
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='ui form'>
          <MyTextArea
            name='comment'
            placeholder='Enter Comment Here'
            rows={2}
          />
          <Button
            loading={isSubmitting}
            content='Add Reply '
            icon='edit '
            primary
            type='submit'
          />
        </Form>
      )}
    </Formik>
  );
}
