"use client";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import StudentDialogForm from "../dialogForms/studentDialogForm";
import StudentDashContent from "./studentDashContent";

function StudentDashboard() {
  const [isEnrolled, setisEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/student", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setisEnrolled(true);
          setIsLoading(false);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error(error);
        setisEnrolled(false);
        setIsLoading(true);
      }
    };
    checkEnrollment();
  }, [isEnrolled]);

  return (
    <>
      {!isLoading && isEnrolled && <StudentDashContent />}
      {isLoading && !isEnrolled && (
        <StudentDialogForm handleSetEnrollment={() => setisEnrolled(true)} />
      )}
    </>
  );
}

export default StudentDashboard;
