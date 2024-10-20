"use client";

import { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import About from "../components/About";
import TempGateway from "../components/TempGateway";
const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <RegisterForm />
      <About />
      <TempGateway />
    </>
  );
};

export default ModelProvider;
