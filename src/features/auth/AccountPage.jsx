import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function AccountPage() {
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      <div>
        <Header color='teal' sub content='Change Password' />
        <Formik
          initialValues={{ newPassword1: "", newPassword2: "" }}
          validationSchema={Yup.object({
            newPassword1: Yup.string().required(),
            newPassword2: Yup.string().oneOf(
              [Yup.ref("newPassword1"), null],
              "Passwords Do Not Match"
            ),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, isSubmitting, isValid, dirty }) => (
            <Form className='ui form'>
              <MyTextInput
                name='myPassword1'
                type='password'
                placeholder='New Password'
              />
              <MyTextInput
                name='myPassword2'
                type='password'
                placeholder='Confirm Password'
              />
              {errors.auth && (
                <Label
                  basic
                  color='red'
                  style={{ marginBottom: 10 }}
                  content={errors.auth}
                />
              )}
              <Button
                type='submit'
                disabled={!isValid || isSubmitting || !dirty}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Header color='teal' sub content='Facebook account' />
        <p> Please vissit facebook to update your account</p>
        <Button
          icon='facebook'
          color='facebook'
          as={Link}
          to='https://facebook.com'
          content='Go To Facebook'
        />
      </div>
      <div>
        <Header color='teal' sub content='Google account' />
        <p> Please vissit Google to update your account</p>
        <Button
          icon='google'
          color='google plus'
          as={Link}
          to='https://Google.com'
          content='Go To Google'
        />
      </div>
    </Segment>
  );
}
