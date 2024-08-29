import React from "react";
import axios from "axios";
import { UserRound, BriefcaseBusiness, DollarSign } from "lucide-react";
import CardDashContent from "./CardDashContent";

const studentsCount = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/university/students",
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data.count;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const students = studentsCount();
console.log(students);

function AcademicDashContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <CardDashContent
        title="Students count"
        Icon={UserRound}
        cardContent={students}
        cardDescription="Count of students enrolled in the university"
      />
      <CardDashContent
        title="Convenctions count"
        Icon={BriefcaseBusiness}
        cardContent={"number"}
        cardDescription="Count of affiliated companies"
      />
      <CardDashContent
        title="Internships count"
        Icon={DollarSign}
        cardContent={"number"}
        cardDescription="Count of students enrolled in internships"
      />
    </div>
  );
}

export default AcademicDashContent;
