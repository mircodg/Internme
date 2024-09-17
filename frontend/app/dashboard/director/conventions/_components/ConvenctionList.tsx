"use client";
import { useState, useEffect, useRef } from "react";

import DashCustomList from "@/components/dash-components/dashCustomList";
import axios from "axios";

type convention = {
  CompanyName: string;
  CompanyVatNuber: number;
  Status: "Active" | "Pending" | "Rejected" | "Expired";
};

function ConvenctionListPage() {
  const [conventionsList, setConventionList] = useState<convention[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchConvenctions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/university/conventions",
          {
            withCredentials: true,
          }
        );
        const convenctionsArray = response.data.conventions;
        convenctionsArray.forEach((convention: any) => {
          const pushConvention: convention = {
            CompanyName: convention.Nome,
            CompanyVatNuber: convention.PartitaIva,
            Status: convention.Stato,
          };
          if (
            !conventionsList.some(
              (element) =>
                element.CompanyVatNuber === pushConvention.CompanyVatNuber
            )
          ) {
            setConventionList((prev) => [...prev, pushConvention]);
          }
        });
      } catch (error) {
        console.error(error);
        setConventionList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConvenctions();
  }, [conventionsList]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DashCustomList
          title="Conventions"
          description="List of all conventions"
          type="conventions"
          firstColumn="Company Name"
          secondColumn="Company VAT Number"
          thirdColumn="Status"
          actions={true}
          data={conventionsList}
        />
      )}
    </>
  );
}

export default ConvenctionListPage;
