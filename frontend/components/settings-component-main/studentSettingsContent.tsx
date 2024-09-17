import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Label } from "../ui/label";


type EnrollmentData = {
  Matricola: string;
  NomeUniversita: string;
};

function StudentSettingsContent() {
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData>();

  const fetchStudentEnrollment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/student/enrollment",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const enrollment: EnrollmentData = {
          Matricola: response.data.data.Matricola,
          NomeUniversita: response.data.data.Nome,
        };
        setEnrollmentData(enrollment);
      }
    } catch (err: any) {
      toast({
        description: err.response.data.message,
        variant: "destructive",
      });
      setEnrollmentData(undefined);
    }
  };

  useEffect(() => {
    fetchStudentEnrollment();
  }, []);

  return (
    <>
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Enrollment Details</CardTitle>
          <CardDescription>See yout enrollment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between gap-y-2">
            <div className=" min-w-[200px]">
              <Label className="font-bold">Matricola</Label>
              <p>{enrollmentData?.Matricola}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Nome Universita</Label>
              <p>{enrollmentData?.NomeUniversita}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default StudentSettingsContent;
