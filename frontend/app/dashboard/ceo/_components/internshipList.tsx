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
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateInternshipFormSchema = z.object({
  InternshipID: z.number().optional(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  mode: z.string(),
  maxInterns: z.preprocess(
    (val) => parseInt(val as string),
    z.number().refine((val) => val > 0)
  ),
  cdl: z.string().refine((val) => val.length > 1),
  pay: z.preprocess(
    (val) => (val === "" ? (val = 0) : parseInt(val as string)),
    z.number().optional()
  ),
  ActiveInterns: z.preprocess(
    (val) =>
      val === undefined || val === null ? (val = 0) : parseInt(val as string),
    z.number().int()
  ),
});

export type Inputs = z.infer<typeof CreateInternshipFormSchema>;

export type internshipsData = {
  InternshipID?: number;
  title: string;
  description: string;
  Internshiptype: string;
  Mode: string;
  MaxInterns: number;
  CDL: string;
  Pay?: number;
  Candidate?: boolean;
  ActiveInterns: number;
};

function InternshipList() {
  const [internships, setInternships] = useState<internshipsData[]>([]);
  const [isopen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState("all");
  // const hasFetched = useRef(false);

  useEffect(() => {
    // if (hasFetched.current) return;
    // hasFetched.current = true;
    const fetchAllInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/internship",
          {
            withCredentials: true,
          }
        );
        const internshipsArray = response.data.tirocini;
        const promises = internshipsArray.map(async (internship: any) => {
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
            // ActiveInterns: parseInt(count),
            ActiveInterns: response.data.count.count,
          };
          if (
            !internships.some(
              (element) => element.InternshipID === newInternship.InternshipID
            )
          ) {
            internships.push(newInternship);
          }
        });
        await Promise.all(promises);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // setInternships([]);
        setLoading(false);
      }
    };

    const fetchActiveInternships = async () => {
      try {
        setLoading(true);
        setInternships([]);
        const response = await axios.get(
          "http://localhost:8000/api/company/internship/active",
          {
            withCredentials: true,
          }
        );
        const internshipsArray = response.data.internships;
        const promises = internshipsArray.map(async (internship: any) => {
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
            // ActiveInterns: parseInt(count),
            ActiveInterns: response.data.count.count,
          };
          setInternships((internships) => [...internships, newInternship]);
        });
        await Promise.all(promises);
        setLoading(false);
      } catch (error: any) {
        toast({
          description: error.response.data.message,
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    const fetchFullInternships = async () => {
      try {
        setLoading(true);
        setInternships([]);
        const response = await axios.get(
          "http://localhost:8000/api/company/internship/full",
          {
            withCredentials: true,
          }
        );
        const internshipsArray = response.data.internships;
        const promises = internshipsArray.map(async (internship: any) => {
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
            // ActiveInterns: parseInt(count),
            ActiveInterns: response.data.count.count,
          };
          setInternships((internships) => [...internships, newInternship]);
        });
        await Promise.all(promises);
        setLoading(false);
      } catch (error: any) {
        toast({
          description: error.response.data.message,
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (tabValue === "active") fetchActiveInternships();
    if (tabValue === "full") fetchFullInternships();
    if (tabValue === "all") fetchAllInternships();
  }, [tabValue]);

  const onError = (error: any) => {
    console.log("Form errors: " + JSON.stringify(error, null, 2));
  };

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    const newInternship: internshipsData = {
      title: data.title,
      description: data.description,
      Internshiptype: data.type,
      Mode: data.mode,
      MaxInterns: data.maxInterns,
      CDL: data.cdl,
      Pay: data.pay,
      ActiveInterns: data.ActiveInterns,
    };
    if (
      !internships.some(
        (element) => element.InternshipID === newInternship.InternshipID
      )
    ) {
      setInternships((internships) => [...internships, newInternship]);
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
      // retrieve idAzienda and then send emails to students
      const response2 = await axios.get(
        "http://localhost:8000/api/company/sites",
        {
          withCredentials: true,
        }
      );
      const idAzienda = response2.data.company.idAzienda;
      await axios.post("/api/internship/notification", { idAzienda });
      window.location.reload();
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
      setIsOpen(true);
    }
    reset();
  };

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({ resolver: zodResolver(CreateInternshipFormSchema) });

  return (
    <>
      <div className="flex items-center">
        <Tabs onValueChange={(value) => setTabValue(value)} value={tabValue}>
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
                className="h-8 gap-1 hover:cursor-pointer"
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
              <form onSubmit={handleSubmit(submitHandler, onError)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      placeholder="IT Specialist"
                      {...register("title", { required: true })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      type="text"
                      id="description"
                      placeholder="We are looking for ..."
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <span>{errors.description.message}</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select onValueChange={(value) => setValue("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Intra-curricular">
                            Intra-curricular
                          </SelectItem>
                          <SelectItem value="Extra-curricular">
                            Extra-curricular
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.type && <span>{errors.type.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="mode">Mode</Label>
                    <Select onValueChange={(value) => setValue("mode", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="In place">In place</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.mode && <span>{errors.mode.message}</span>}
                  </div>
                  <div>
                    <Label htmlFor="maxInterns">Max Interns</Label>
                    <Input
                      type="text"
                      id="maxInterns"
                      placeholder="5"
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
                    <Label htmlFor="pay">Payment</Label>
                    <Input
                      type="text"
                      id="pay"
                      placeholder=""
                      {...register("pay")}
                    />
                    {errors.pay && <span>{errors.pay.message}</span>}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsOpen(false);
                        reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={!isValid}>
                    Add Post
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        {loading && <p>Loading...</p>}
        {!loading &&
          internships.length > 0 &&
          internships.map((internship, index) => {
            return (
              <InternshipCard
                key={index}
                InternshipID={internship.InternshipID}
                title={internship.title}
                description={internship.description}
                Mode={internship.Mode}
                MaxInterns={internship.MaxInterns}
                CDL={internship.CDL}
                Pay={internship.Pay}
                Internshiptype={internship.Internshiptype}
                Candidate={false}
                ActiveInterns={internship.ActiveInterns}
              />
            );
          })}
      </div>
      {!loading && internships.length === 0 && (
        <div className="flex justify-center items-center">
          {tabValue === "active" ? (
            <p className="font-semibold">
              No active internships available. Add a new one!
            </p>
          ) : tabValue === "full" ? (
            <p className="font-semibold">No full internships available</p>
          ) : (
            <p className="font-semibold">
              No internships available. Add a new one!
            </p>
          )}
        </div>
      )}
    </>
  );
}
export default InternshipList;
