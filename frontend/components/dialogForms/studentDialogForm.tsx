"use client";
import { studentDialogSchema } from "@/schema/DialogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Inputs = z.infer<typeof studentDialogSchema>;

interface StudentDialogFormProps {
  handleSetEnrollment: () => void;
}

function StudentDialogForm({ handleSetEnrollment }: StudentDialogFormProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUniversityLoading, setIsUniversityLoading] = useState(true);
  const [university] = useState<string[]>([]);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/universities",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // response give me back an array of objects. I want to collect the field name of each object and store it in university array
          response.data.universities.map((uni: any) => {
            // if uni.Nome is not in the university array, push it
            if (!university.includes(uni.Nome)) university.push(uni.Nome);
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsUniversityLoading(false);
      }
    };
    fetchUniversity();

    if (university && university.length > 0) {
      setIsUniversityLoading(false);
    }
  }, []);

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    console.log(data);
    const formData = new FormData(); // used to send file
    formData.append("Matricola", data.Matricola.toString()); // will be converted back to number in the backend
    formData.append("Universita", data.Universita);
    formData.append("CorsoDiLaurea", data.CorsoDiLaurea);
    formData.append("CV", data.CV[0]);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/student",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setOpen(false);
        handleSetEnrollment();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(studentDialogSchema),
    mode: "onChange",
  });
  return (
    <Dialog open={open}>
      {/* <DialogContent className="sm:max-w-[425px]"> */}
      <DialogContent className=" max-w-sm md:max-w-[700px]">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogHeader>
            <DialogTitle>Add more details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 mx-auto">
            <div className="flex flex-col justify-center items-start gap-2">
              <Label htmlFor="studentID">Student ID</Label>
              <Input
                type="text"
                id="studentID"
                placeholder="532460"
                {...register("Matricola", { required: true })}
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <Label htmlFor="university">University</Label>
              <Select onValueChange={(value) => setValue("Universita", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {isUniversityLoading ? (
                    <SelectItem value="LoadingUni" disabled>
                      Loading universities...
                    </SelectItem>
                  ) : university.length > 0 ? (
                    university.map((uni, index) => (
                      <SelectItem value={uni} key={index}>
                        {uni}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No universities available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <Label htmlFor="corsoDiLaurea">Degree Course</Label>
              <Input
                type="text"
                id="corsoDiLaurea"
                placeholder="Computer Engineering"
                {...register("CorsoDiLaurea", { required: true })}
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <Label htmlFor="cv">Curricul Vitae</Label>
              <Input
                type="file"
                id="cv"
                placeholder="Upload your CV"
                {...register("CV", { required: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isValid}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save details"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentDialogForm;
