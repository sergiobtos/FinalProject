import React from "react";
import AppContext from "../../../context/AppContext";
import SignIn from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const appContext: any = React.useContext(AppContext);
  return <>{appContext.isSigninPageOpened ? <SignIn /> : <Register />}</>;
}