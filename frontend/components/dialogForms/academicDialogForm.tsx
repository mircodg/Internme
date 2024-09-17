"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { academicDialogSchema } from "@/schema/DialogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

type Inputs = z.infer<typeof academicDialogSchema>;

interface AcademicDialogFormProps {
  handleSetUniversity: () => void;
}

function AcademicDialogForm({ handleSetUniversity }: AcademicDialogFormProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/university", data, {
        withCredentials: true,
      });
      setOpen(!open);
      handleSetUniversity();
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
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(academicDialogSchema),
    mode: "onChange",
  });

  return (
    <Dialog open={open}>
      {/* <DialogContent className="sm:max-w-[425px]"> */}
      <DialogContent className=" max-w-sm sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogHeader>
            <DialogTitle>Add University details</DialogTitle>
            <DialogDescription>
              Add the name and address of the university
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 mx-auto">
            <div>
              <Label htmlFor="nome">Name</Label>
              <Input
                type="text"
                id="nome"
                placeholder="Uni Name"
                {...register("NomeUniversita", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="via">Route</Label>
              <Input
                type="text"
                id="via"
                placeholder="J.F. Kennedy"
                {...register("Via", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="NumeroCivico">Street Number</Label>
              <Input
                type="text"
                id="NumeroCivico"
                placeholder="10"
                {...register("NumeroCivico", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="CAP">Postal Code</Label>
              <Input
                type="text"
                id="CAP"
                placeholder="98057"
                {...register("CAP", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="citta">City</Label>
              <Input
                type="text"
                id="citta"
                placeholder="Milazzo"
                {...register("Citta", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="provincia">Province</Label>
              <Input
                type="text"
                id="provincia"
                placeholder="ME"
                {...register("Provincia", { required: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isValid}>
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
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

export default AcademicDialogForm;
