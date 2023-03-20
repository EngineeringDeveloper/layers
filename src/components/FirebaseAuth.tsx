import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebase";
const ui = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

ui.start("#firebaseui-auth-container", uiConfig);
export const FirebaseAuth = () => {
  return <div id="firebaseui-auth-container"></div>;
};
