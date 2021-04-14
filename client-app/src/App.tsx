import React, { useEffect } from "react";
import ButtonAppBar from "./Appbar";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AuthPage from "./components/views/AuthentificationPages/AuthPage";
import NurseHomepage from "./components/views/NursePages/NurseHomepage";
import PatientHomepage from "./components/views/PatientPages/PatientHomepage";

export default function App() {
  const [alerts, setAlerts] = React.useState([]);
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
    localStorage.removeItem("token");
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

  const handleAlertsReceived = (data : any)=> {
    setAlerts(data);
  }

  const value = {
    isSigninPageOpened: isSigninPage,
    getUserData: userData,
    isSignedin: isSigned,
    handleGoToRegisterPage: handleGoToRegister,
    handleGoToLoginPage: handleGoToLogin,
    handleGetUserData: handleTransUserData,
    handleSignedIn: handleSigned,
    handleLogoutToLoginPage: handleLogout,
    handleAlerts : handleAlertsReceived,
    listAlerts : alerts
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
