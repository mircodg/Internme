"use client";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CeoDashContent from "./ceoDashContent";
import CeoDialogForm from "../dialogForms/ceoDialogForm";

function CeoDashboard() {
  const [hasCompany, setHasCompany] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const company = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/company", {
          withCredentials: true,
        });
        if (
          response.status === 200 &&
          response.data.message === "Company found"
        ) {
          setHasCompany(true);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };
    company();
  }, [hasCompany]);

  return (
    <>
      {!isLoading && hasCompany && <CeoDashContent />}
      {isLoading && !hasCompany && (
        <CeoDialogForm handleSetCompany={() => setHasCompany(true)} />
      )}
    </>
  );
}

export default CeoDashboard;
