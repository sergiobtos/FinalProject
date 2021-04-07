import React, { useEffect } from "react";
import ButtonAppBar from "./Appbar";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AuthPage from "./components/views/AuthentificationPages/AuthPage";
import NurseHomepage from "./components/views/NursePages/NurseHomepage";
import PatientHomepage from "./components/views/PatientPages/PatientHomepage";

export default function App() {
  const [isSigninPage, setSigninPage] = React.useState(true);
  const [isSigned, setSignedin] = React.useState(false);
  const [userData, setUserData] = React.useState({
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    accountType: ""
  });

  const handleGoToRegister = () => {
    setSigninPage(false);
  };
  const handleGoToLogin = () => {
    setSigninPage(true);
  };
  const handleSigned = () => {
    setSignedin(true);
  };
  const handleLogout = () => {
    setSignedin(false);
    handleGoToLogin();
  };

  const handleTransUserData = (data: any) => {
    setUserData({
      _id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      password: data.password,
      accountType: data.accountType
    });
  };

  const value = {
    isSigninPageOpened: isSigninPage,
    getUserData: userData,
    isSignedin: isSigned,
    handleGoToRegisterPage: handleGoToRegister,
    handleGoToLoginPage: handleGoToLogin,
    handleGetUserData: handleTransUserData,
    handleSignedIn: handleSigned,
    handleLogoutToLoginPage: handleLogout
  };

  return (
    <AppProvider value={value}>
      <ButtonAppBar />
      {isSigned ? (
        userData.accountType == "Nurse" ? (
          <NurseHomepage />
        ) : (
          <PatientHomepage />
        )
      ) : (
        <AuthPage />
      )}
    </AppProvider>
  );
}
