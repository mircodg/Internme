"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FeedbackCard from "./FeedbackCard";
import { toast } from "@/components/ui/use-toast";
interface FeedbackListProps {
  mode: "student" | "ceo";
}

export type studentsFeedback = {
  idTirocinio: number;
  Matricola: number;
  idUniversita: number;
  NomeAzienda: string;
  TitoloTirocinio: string;
  Descrizione: string;
  Stelle: number;
};

export type companyFeedback = {
  idTirocinio: number;
  Matricola: number;
  idUniversita: number;
  NomeStudente: string;
  CognomeStudente: string;
  Universita: string;
  TitoloTirocinio: string;
  Descrizione: string;
  Stelle: number;
};

function FeedbackList({ mode }: FeedbackListProps) {
  const [studentFeedbacks, setStudentsFeedbacks] = useState<studentsFeedback[]>(
    []
  );
  const [companyFeedbacks, setCompanyFeedbacks] = useState<companyFeedback[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const fetchStudentFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/student/feedbacks",
        { withCredentials: true }
      );
      if (response.status === 200) {
        const allFeedbacks = response.data.feedbacks;
        allFeedbacks.forEach((feedback: studentsFeedback) => {
          const newFeedback: studentsFeedback = {
            idTirocinio: feedback.idTirocinio,
            Matricola: feedback.Matricola,
            idUniversita: feedback.idUniversita,
            NomeAzienda: feedback.NomeAzienda,
            TitoloTirocinio: feedback.TitoloTirocinio,
            Descrizione: feedback.Descrizione,
            Stelle: feedback.Stelle,
          };
          // add new feedback to the list only if it has different idTirocinio, Matricola, idUniversita
          if (
            !studentFeedbacks.some(
              (feedback) =>
                feedback.idTirocinio === newFeedback.idTirocinio &&
                feedback.Matricola === newFeedback.Matricola &&
                feedback.idUniversita === newFeedback.idUniversita
            )
          ) {
            studentFeedbacks.push(newFeedback);
          }
        });
        setLoading(false);
      }
    } catch (error: any) {
      setStudentsFeedbacks([]);
      setLoading(false);
    }
  };

  const fetchCompanyFeedbacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/company/feedbacks",
        { withCredentials: true }
      );
      if (response.status === 200) {
        const allFeedbacks = response.data.feedbacks;
        allFeedbacks.forEach((feedback: companyFeedback) => {
          const newFeedback: companyFeedback = {
            idTirocinio: feedback.idTirocinio,
            Matricola: feedback.Matricola,
            idUniversita: feedback.idUniversita,
            NomeStudente: feedback.NomeStudente,
            CognomeStudente: feedback.CognomeStudente,
            Universita: feedback.Universita,
            TitoloTirocinio: feedback.TitoloTirocinio,
            Descrizione: feedback.Descrizione,
            Stelle: feedback.Stelle,
          };
          if (
            !companyFeedbacks.some(
              (feedback) =>
                feedback.idTirocinio === newFeedback.idTirocinio &&
                feedback.Matricola === newFeedback.Matricola &&
                feedback.idUniversita === newFeedback.idUniversita
            )
          ) {
            companyFeedbacks.push(newFeedback);
          }
        });
        setLoading(false);
      }
    } catch (error: any) {
      toast({ description: error.response.data.message });
      setCompanyFeedbacks([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "student") {
      fetchStudentFeedbacks();
    } else {
      fetchCompanyFeedbacks();
    }
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {mode === "student" && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
          <FeedbackCard mode={"student"} data={studentFeedbacks} />
        </div>
      )}
      {mode === "ceo" && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
          <FeedbackCard mode={"ceo"} data={companyFeedbacks} />
        </div>
      )}
    </>
  );
}
export default FeedbackList;
