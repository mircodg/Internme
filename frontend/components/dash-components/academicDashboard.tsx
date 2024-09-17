"use client";
import { useEffect, useState } from "react";
import AcademicDialogForm from "../dialogForms/academicDialogForm";
import axios from "axios";
import AcademicDashContent from "./academicDashContent";
import { Loader2 } from "lucide-react";

function AcademicDashboard() {
  const [hasUni, setHasUni] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingContent, setIsLoadingContent] = useState(true);

  useEffect(() => {
    const hasUniversity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/university",
          {
            withCredentials: true,
          }
        );
        if (response.data.university !== false) {
          setHasUni(true);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };
    hasUniversity();
  }, [hasUni]);

  return (
    <>
      {/* {!isLoadingContent && hasUni && <AcademicDashContent />} */}
      {!isLoading && hasUni && <AcademicDashContent />}
      {isLoading && !hasUni && (
        <AcademicDialogForm handleSetUniversity={() => setHasUni(true)} />
      )}
    </>
  );
}

export default AcademicDashboard;
