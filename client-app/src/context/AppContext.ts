import React from "react";

// Create a context place to put the value for global use
const AppContext = React.createContext({});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;