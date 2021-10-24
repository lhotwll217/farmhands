import { Formik, Form } from "formik";
import ModalWrapper from "../../app/common/form/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/form/modals/modalReducer";
import { signInUser } from "./authActions";
import { signInWithEmail } from "../../app/firestore/firebaseService";

export default function LoginForm() {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size='mini' header='Sign in to Re-eents'>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email Address' />
            <MyTextInput
              name='password'
              placeholder='Placeholder'
              type='password'
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              size='large'
              color='teal'
              content='Login'
              fluid
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
