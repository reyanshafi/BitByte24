"use client";
import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [registrationId, setRegistrationId] = useState(null);
  const [email, setEmail] = useState([]);
  return (
    <RegistrationContext.Provider
      value={{ registrationId, setRegistrationId, email, setEmail }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
