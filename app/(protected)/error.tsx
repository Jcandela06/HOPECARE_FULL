"use client";

import { AlertTriangle } from "lucide-react";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
      <AlertTriangle size={40} />

      <p>Algo salió mal. Inténtalo de nuevo más tarde.</p>
    </div>
  );
};

export default ErrorPage;
