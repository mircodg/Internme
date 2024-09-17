import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Star } from "lucide-react";
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

import type { studentsFeedback } from "./FeedbackList";
import type { companyFeedback } from "./FeedbackList";

interface FeedbackCardProps {
  mode: "student" | "ceo";
  data: studentsFeedback[] | companyFeedback[];
}
function FeedbackCard({ mode, data }: FeedbackCardProps) {
  return (
    <>
      {mode === "student" &&
        data.length > 0 &&
        (data as studentsFeedback[]).map((studentFeedback, index) => {
          return (
            <div className="group max-w-[350px]" key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="group-hover:shadow-2xl sm:h-[150px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {studentFeedback.NomeAzienda}
                      </CardTitle>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:transition-transform group-hover:translate-x-1" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground hidden md:block">
                        {studentFeedback.TitoloTirocinio}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="md:text-lg">
                      Your feedback 📝
                    </DialogTitle>
                    <DialogDescription>
                      To {studentFeedback.NomeAzienda} for {""}
                      {studentFeedback.TitoloTirocinio} internship
                    </DialogDescription>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-center md:justify-normal items-center gap-1">
                        <p className="font-semibold">Rating: </p>
                        {[...Array(5)].map((_, index) => {
                          return (
                            <Star
                              key={index}
                              className={
                                index + 1 <= studentFeedback.Stelle
                                  ? "fill-current h-4 w-4"
                                  : "h-4 w-4"
                              }
                            />
                          );
                        })}
                      </div>
                      <p>{studentFeedback.Descrizione}</p>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      {mode === "ceo" &&
        data.length > 0 &&
        (data as companyFeedback[]).map((companyFeedback, index) => {
          return (
            <div className="group max-w-[350px]" key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="group-hover:shadow-2xl sm:h-[150px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {companyFeedback.TitoloTirocinio}
                      </CardTitle>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:transition-transform group-hover:translate-x-1" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground hidden md:block">
                        {companyFeedback.Matricola}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="md:text-lg">
                      New Feedback by:
                    </DialogTitle>
                    <DialogDescription>
                      {companyFeedback.NomeStudente}{" "}
                      {companyFeedback.CognomeStudente} from{" "}
                      {companyFeedback.Universita} on{" "}
                      {companyFeedback.TitoloTirocinio} internship
                    </DialogDescription>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-center md:justify-normal items-center gap-1">
                        <p className="font-semibold">Rating: </p>
                        {[...Array(5)].map((_, index) => {
                          return (
                            <Star
                              key={index}
                              className={
                                index + 1 <= companyFeedback.Stelle
                                  ? "fill-current h-4 w-4"
                                  : "h-4 w-4"
                              }
                            />
                          );
                        })}
                      </div>
                      <p>{companyFeedback.Descrizione}</p>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      {data.length === 0 && (
        <p className="font-bold md:text-xl ">No feedbacks available</p>
      )}
    </>
  );
}

export default FeedbackCard;
