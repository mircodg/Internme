import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Trash2 } from "lucide-react";
import axios from "axios";

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

import type { internshipsData } from "@/app/dashboard/ceo/_components/internshipList";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const handleApplication = async (InternshipID: any) => {
  try {
    if (InternshipID === undefined) return;
    await axios.post(
      `http://localhost:8000/api/student/apply/${InternshipID}`,
      null,
      {
        withCredentials: true,
      }
    );
    // send email to the company
    await axios.post("/api/application", { idTirocinio: InternshipID });
    window.location.reload();
  } catch (error) {
    toast({
      description: "You have already have an active internship",
      variant: "destructive",
    });
  }
};

const handleRemoveInternship = async (InternshipID: number | undefined) => {
  try {
    await axios.delete(
      `http://localhost:8000/api/internship/remove/${InternshipID}`,
      {
        withCredentials: true,
      }
    );
    window.location.reload();
  } catch (err: any) {
    toast({
      description: err.response.data.message,
      variant: "destructive",
    });
  }
};

function InternshipCard({
  InternshipID,
  title,
  description,
  Internshiptype,
  Mode,
  MaxInterns,
  CDL,
  Pay,
  Candidate,
  ActiveInterns,
}: internshipsData) {
  return (
    // <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    <div>
      <div className="group">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="max-w-[350px] group-hover:shadow-2xl sm:h-[150px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:transition-transform group-hover:translate-x-1" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {description?.length > 20
                    ? description.substring(0, 50) + "..."
                    : description}
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold text-xl">
                {title}
              </DialogTitle>
              <DialogDescription className="text-primary text-balance">
                {description}
              </DialogDescription>
              <div className="grid grid-cols-2 gap-4  md:grid-cols-3">
                <div className=" flex md:flex-col w-full justify-center items-start md:justify-start md:items-start gap-1">
                  <h3 className="text-sm font-semibold">Type:</h3>
                  <p className="text-sm">{Internshiptype}</p>
                </div>
                <div className=" flex md:flex-col w-full justify-center items-start md:justify-start md:items-start gap-1">
                  <h3 className="text-sm font-semibold">Mode:</h3>
                  <p className="text-sm">{Mode}</p>
                </div>
                <div className=" flex md:flex-col w-full justify-center items-start md:justify-start md:items-start gap-1">
                  <h3 className="text-sm font-semibold">Max Interns:</h3>
                  <p className="text-sm">{MaxInterns}</p>
                </div>
                <div className=" flex md:flex-col w-full justify-center items-start md:justify-start md:items-start gap-1">
                  <h3 className="text-sm font-semibold">CDL:</h3>
                  <p className="text-sm">{CDL}</p>
                </div>
                <div className=" flex md:flex-col w-full justify-center items-start md:justify-start md:items-start gap-1">
                  <h3 className="text-sm font-semibold">Payment:</h3>
                  {Pay ? (
                    <p className="text-sm">{Pay}€</p>
                  ) : (
                    <p className="text-sm">Not Available</p>
                  )}
                </div>
                <div className=" flex md:flex-col w-full justify-center items-start md:justify-start md:items-start gap-1">
                  <h3 className="text-sm font-semibold">Active Interns:</h3>
                  <p className="text-sm">{ActiveInterns}</p>
                </div>
              </div>
            </DialogHeader>
            {Candidate && (
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => handleApplication(InternshipID)}
                    disabled={MaxInterns > ActiveInterns ? false : true}
                  >
                    Apply
                  </Button>
                </DialogClose>
              </DialogFooter>
            )}
            {ActiveInterns === 0 && !Candidate && (
              <DialogFooter>
                <DialogClose
                  asChild
                  onClick={() => handleRemoveInternship(InternshipID)}
                >
                  <Button size={"sm"} className="gap-2" variant={"destructive"}>
                    <Trash2 className="h-[1.2rem] w-[1.2rem]" />
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default InternshipCard;
