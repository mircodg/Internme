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
        setIsLoading(true);
        const response = await axios.get("http://localhost:8000/api/company", {
          withCredentials: true,
        });
        if (
          response.status === 200 &&
          response.data.message === "Company found"
        ) {
          setHasCompany(true);
        }
      } catch (error) {
        console.error(error);
        setHasCompany(false);
      } finally {
        setIsLoading(false);
      }
    };
    company();
  }, [hasCompany]);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : !isLoading && hasCompany ? (
        <CeoDashContent />
      ) : (
        <CeoDialogForm />
      )}
    </>
  );
}

export default CeoDashboard;
