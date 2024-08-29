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
        setIsLoading(true);
        const response = await axios.get("http://localhost:8000/api/student", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setisEnrolled(true);
        }
      } catch (error) {
        console.error(error);
        setisEnrolled(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkEnrollment();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : !isLoading && isEnrolled ? (
        <StudentDashContent />
      ) : (
        <StudentDialogForm />
      )}
    </>
  );
}

export default StudentDashboard;
