"use client";
import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import { UserRound, BriefcaseBusiness, DollarSign } from "lucide-react";
import CardDashContent from "./CardDashContent";

// import AcademicStudentsList from "./academicStudentsList";
import DashCustomList from "./dashCustomList";

type studentData = {
  StudentID: number;
  Name: string;
  Surname: string;
};

function AcademicDashContent() {
  const [studentNumber, setStudentNumber] = useState<number>(0);
  const [convenctionNumber, setConvenctionNumber] = useState<number>(0);
  const [internshipNumber, setInternshipNumber] = useState<number>(0);
  const [studentsList, setStudentList] = useState<studentData[]>([]);
  const [loadingUni, setLoadingUni] = useState<boolean>(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const studentsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/university/students/count",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setStudentNumber(response.data.count);
        }
      } catch (error) {
        console.error(error);
        setStudentNumber(0);
      }
    };
    studentsCount();

    const fetchConvenctionNumber = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/university/conventions/number",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setConvenctionNumber(response.data.count);
        }
      } catch (error) {
        console.error(error);
        setConvenctionNumber(0);
      }
    };
    fetchConvenctionNumber();

    const getStudentsList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/university/students/list",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const studentsArray = response.data.students;
          studentsArray.forEach((student: any) => {
            const pushStudent: studentData = {
              StudentID: student.Matricola,
              Name: student.Nome,
              Surname: student.Cognome,
            };
            if (
              !studentsList.some(
                (element) => element.StudentID === pushStudent.StudentID
              )
            ) {
              setStudentList((prev) => [...prev, pushStudent]);
            }
          });
        }
      } catch (error) {
        console.error(error);
        setStudentList([]);
      } finally {
        setLoadingUni(false);
      }
    };
    getStudentsList();

    const internshipsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/university/interns/number",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setInternshipNumber(response.data.count);
        }
      } catch (error) {
        console.error(error);
        setInternshipNumber(0);
      }
    };
    internshipsCount();
  }, [studentsList]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardDashContent
          title="Students count"
          Icon={UserRound}
          cardContent={`${studentNumber}`}
          cardDescription="Count of students enrolled in the university"
        />
        <CardDashContent
          title="Convenctions count"
          Icon={BriefcaseBusiness}
          cardContent={`${convenctionNumber}`}
          cardDescription="Count of active conventions"
        />
        <CardDashContent
          title="Internships count"
          Icon={DollarSign}
          cardContent={`${internshipNumber}`}
          cardDescription="Count of students enrolled in internships"
        />
      </div>
      {/* <AcademicStudentsList /> */}

      {loadingUni ? (
        <p className="my-4">Loading...</p>
      ) : (
        <DashCustomList
          title="Students"
          description="List of enrolled students"
          type="students"
          firstColumn="Student ID"
          secondColumn="Name"
          thirdColumn="Surname"
          actions={false}
          data={studentsList}
        />
      )}
    </>
  );
}

export default AcademicDashContent;
