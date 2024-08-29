"use client";
import { useEffect, useState } from "react";
import AcademicDialogForm from "../dialogForms/academicDialogForm";
import axios from "axios";
import AcademicDashContent from "./academicDashContent";
import { LoaderCircle } from "lucide-react";

function AcademicDashboard() {
  const [hasUni, setHasUni] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasUniversity = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/university",
          {
            withCredentials: true,
          }
        );
        if (response.data.university !== "false") {
          setHasUni(true);
        }
      } catch (error) {
        console.error(error);
        setHasUni(false);
      } finally {
        setIsLoading(false);
      }
    };
    hasUniversity();
  }, [hasUni]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : !isLoading && hasUni ? (
        <AcademicDashContent />
      ) : (
        <AcademicDialogForm />
      )}
    </>
  );
}

export default AcademicDashboard;
