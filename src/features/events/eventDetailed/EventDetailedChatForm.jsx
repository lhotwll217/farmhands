import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";
import { addEventChatComment } from "../../../app/firestore/firebaseService";

export default function EventDetailedChatForm({ eventId }) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
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
      {({ isSubmitting, handleSubmit }) => (
        <Form className='ui form'>
          <Field name='comment'>
            {({ field }) => (
              <div style={{ position: "relative" }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows='2'
                  {...field}
                  placeholder='Enter Comment (Enter T0 Submit)'
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.shiftKey) {
                      return;
                    }
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSubmit();
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}
