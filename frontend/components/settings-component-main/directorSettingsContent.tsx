import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";

export type UniversityData = {
  Nome: string;
  Via: string;
  NumeroCivico: number;
  CAP: number;
  Citta: string;
  Provincia: string;
};

function DirectorSettingsContent() {
  const [universityData, setUniversityData] = useState<UniversityData>();

  const fetchUniversityData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/university/",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const university: UniversityData = {
          Nome: response.data.university.Nome,
          Via: response.data.university.Via,
          NumeroCivico: response.data.university.NumeroCivico,
          CAP: response.data.university.CAP,
          Citta: response.data.university.Citta,
          Provincia: response.data.university.Provincia,
        };
        setUniversityData(university);
      }
    } catch (err: any) {
      toast({
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUniversityData();
  }, []);

  return (
    <>
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">University details</CardTitle>
          <CardDescription>See university informations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between gap-y-2">
            <div className=" min-w-[200px]">
              <Label className="font-bold">Name</Label>
              <p>{universityData?.Nome}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Route</Label>
              <p>
                {universityData?.Via} {universityData?.NumeroCivico}
              </p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Zip Code</Label>
              <p>{universityData?.CAP}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">City</Label>
              <p>{universityData?.Citta}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Province</Label>
              <p>{universityData?.Provincia}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default DirectorSettingsContent;
