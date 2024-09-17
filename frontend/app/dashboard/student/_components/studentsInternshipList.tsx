"use client";
import { useState, useEffect } from "react";
import type { internshipsData } from "../../ceo/_components/internshipList";
import axios from "axios";
import InternshipCard from "../../ceo/_components/internshipCard";

function StudentsInternshipList() {
  const [internshipList, setInternshipList] = useState<internshipsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternshipList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/student/internships",
          {
            withCredentials: true,
          }
        );
        const internshipArray = response.data.internships;
        const promises = internshipArray.map(async (internship: any) => {
          const response = await axios.get(
            `http://localhost:8000/api/company/internship/activeinterns/${internship.idTirocinio}`,
            { withCredentials: true }
          );
          const newInternship: internshipsData = {
            InternshipID: internship.idTirocinio,
            title: internship.Titolo,
            description: internship.Descrizione,
            Internshiptype: internship.TipoTirocinio,
            Mode: internship.TipoSvolgimento,
            MaxInterns: internship.MaxTirocinanti,
            CDL: internship.CDL_Richiesto,
            Pay: internship.Retribuzione,
            Candidate: true,
            ActiveInterns: response.data.count.count,
          };
          if (
            !internshipList.some(
              (element) => element.InternshipID === newInternship.InternshipID
            )
          ) {
            internshipList.push(newInternship);
          }
        });
        await Promise.all(promises);
        setLoading(false);
      } catch (error: any) {
        // toast({
        //   description: error.response.data.message,
        //   variant: "destructive",
        // });
        console.error(error);
        setInternshipList([]);
        setLoading(false);
        return;
      }
    };
    fetchInternshipList();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && internshipList.length > 0 && (
        <div className="my-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          {internshipList.map((internship: internshipsData, index) => (
            <InternshipCard
              key={index}
              InternshipID={internship.InternshipID}
              title={internship.title}
              description={internship.description}
              Internshiptype={internship.Internshiptype}
              Mode={internship.Mode}
              MaxInterns={internship.MaxInterns}
              CDL={internship.CDL}
              Pay={internship.Pay}
              Candidate={internship.Candidate}
              ActiveInterns={internship.ActiveInterns}
            />
          ))}
        </div>
      )}
      {!loading && internshipList.length === 0 && (
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-xl">No internships available.</p>
          <p>
            You have either applied to all available internships or no companies
            associated with your university have posted any internships.
          </p>
        </div>
      )}
    </>
  );
}

export default StudentsInternshipList;
