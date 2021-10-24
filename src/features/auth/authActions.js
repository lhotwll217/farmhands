import firebase from "firebase";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export function signInUser(creds) {
  return async function (dispatch) {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch({ type: SIGN_IN_USER, payload: result.user });
    } catch (error) {
      throw error;
    }
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: SIGN_IN_USER, payload: user });
      } else {
        dispatch(signOutUser());
      }
    });
  };
}
