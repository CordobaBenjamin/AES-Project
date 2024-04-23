import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [key, setKey] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");

  return (
    <AppStateContext.Provider
      value={{
        key,
        setKey,
        currentStep,
        setCurrentStep,
        userName,
        setUserName,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};

export default AppStateContext;
