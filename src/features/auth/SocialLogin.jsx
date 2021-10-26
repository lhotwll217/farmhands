import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { closeModal } from "../../app/common/form/modals/modalReducer";
import { socialLogin } from "../../app/firestore/firebaseService";

export default function SocialLogin() {
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }

  return (
    <>
      <Button
        icon='facebook'
        onClick={() => handleSocialLogin("facebook")}
        fluid
        color='facebook'
        style={{ marginBottom: 10 }}
        content='Login with Facebook'
      />
      <Button
        icon='google'
        onClick={() => handleSocialLogin("google")}
        fluid
        color='google plus'
        content='Login with Google'
      />
    </>
  );
}