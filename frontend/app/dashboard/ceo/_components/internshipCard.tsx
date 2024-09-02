import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

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

function InternshipCard({
  title,
  description,
  Internshiptype,
  Mode,
  MaxInterns,
  CDL,
  Pay,
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
                <p className="text-xs text-muted-foreground">
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
                  <h3 className="text-sm font-semibold">Pay:</h3>
                  {Pay ? (
                    <p className="text-sm">{Pay}</p>
                  ) : (
                    <p className="text-sm">Not Available</p>
                  )}
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {/* <CardAndHover /> */}
    </div>
  );
}

export default InternshipCard;
