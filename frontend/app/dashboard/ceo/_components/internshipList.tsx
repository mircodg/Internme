import axios from "axios";
import InternshipCard from "./internshipCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const CreateInternshipFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.union([z.literal("Intra-curricular"), z.literal("Extra-curricular")]),
  mode: z.union([z.literal("Remote"), z.literal("In place")]),
  maxInterns: z.preprocess(
    (val) => parseInt(val as string),
    z.number().refine((val) => val > 0 && val < 6)
  ),
  cdl: z.string().refine((val) => val.length > 1),
  pay: z.preprocess(
    (val) => (val === "" ? (val = 0) : parseInt(val as string)),
    z.number().optional()
  ),
});

type Inputs = z.infer<typeof CreateInternshipFormSchema>;

export type internshipsData = {
  title: string;
  description: string;
  Internshiptype: "Intra-curricular" | "Extra-curricular";
  Mode: "Remote" | "In place";
  MaxInterns: number;
  CDL: string;
  Pay?: number;
};

function InternshipList() {
  const [internships, setInternships] = useState<internshipsData[]>([]);
  const [isopen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/internship",
          {
            withCredentials: true,
          }
        );
        const internshipsArray = response.data.tirocini;
        console.log(internshipsArray);
        internshipsArray.forEach((internship: any) => {
          const newInternship: internshipsData = {
            title: internship.Titolo,
            description: internship.Descrizione,
            Internshiptype: internship.TipoTirocinio,
            Mode: internship.TipoSvolgimento,
            MaxInterns: internship.MaxTirocinanti,
            CDL: internship.CDL_Richiesto,
            Pay: internship.Retribuzione,
          };
          if (!internships.includes(newInternship)) {
            internships.push(newInternship);
          }
        });
      } catch (error) {
        console.log(error);
        setInternships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
    console.log(internships);
  }, [internships]);

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    const newInternship: internshipsData = {
      title: data.title,
      description: data.description,
      Internshiptype: data.type,
      Mode: data.mode,
      MaxInterns: data.maxInterns,
      CDL: data.cdl,
      Pay: data.pay,
    };
    if (!internships.includes(newInternship)) {
      internships.push(newInternship);
    }
    try {
      const response = axios.post(
        "http://localhost:8000/api/internship",
        data,
        {
          withCredentials: true,
        }
      );
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setIsOpen(true);
    }
    reset();
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ resolver: zodResolver(CreateInternshipFormSchema) });

  return (
    <>
      <div className="flex items-center">
        <Tabs value="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="full" className="hidden sm:flex">
              Full
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-2">
          <Dialog open={isopen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1"
                asChild
                onClick={() => setIsOpen(true)}
              >
                <div>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Post
                  </span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-semibold text-xl">
                  Add Post details
                </DialogTitle>
                <DialogDescription>
                  Add a new post to the internship list
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Intern Title"
                      {...register("title", { required: true })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      type="text"
                      id="description"
                      placeholder="Intern Description"
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <span>{errors.description.message}</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input
                      type="text"
                      id="type"
                      placeholder="Intra/Extra Curricular"
                      {...register("type", { required: true })}
                    />
                    {errors.type && <span>{errors.type.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="mode">Mode</Label>
                    <Input
                      type="text"
                      id="mode"
                      placeholder="Remote/In place"
                      {...register("mode", { required: true })}
                    />
                    {errors.mode && <span>{errors.mode.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="maxInterns">Max Interns</Label>
                    <Input
                      type="text"
                      id="maxInterns"
                      placeholder="Max Interns number"
                      {...register("maxInterns", { required: true })}
                    />
                    {errors.maxInterns && (
                      <span>{errors.maxInterns.message}</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cdl">Degree Course</Label>
                    <Input
                      type="text"
                      id="cdl"
                      placeholder="Computer Engineering"
                      {...register("cdl", { required: true })}
                    />
                    {errors.cdl && <span>{errors.cdl.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="pay">Pay</Label>
                    <Input
                      type="text"
                      id="pay"
                      placeholder="Pay"
                      {...register("pay")}
                    />
                    {errors.pay && <span>{errors.pay.message}</span>}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      submitHandler;
                    }}
                    disabled={!isValid}
                  >
                    Add Post
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        {internships.map((internship, index) => {
          return (
            <InternshipCard
              key={index}
              title={internship.title}
              description={internship.description}
              Mode={internship.Mode}
              MaxInterns={internship.MaxInterns}
              CDL={internship.CDL}
              Pay={internship.Pay}
              Internshiptype={internship.Internshiptype}
            />
          );
        })}
      </div>
    </>
  );
}
export default InternshipList;
