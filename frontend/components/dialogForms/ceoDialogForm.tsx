"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { businessDialogSchema } from "@/schema/DialogSchema";
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
import { useState } from "react";

type Inputs = z.infer<typeof businessDialogSchema>;

interface CeoDialogFormProps {
  handleSetCompany: () => void;
}

function CeoDialogForm({ handleSetCompany }: CeoDialogFormProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(businessDialogSchema),
  });

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/api/company", data, {
        withCredentials: true,
      });
      setOpen(false);
      handleSetCompany();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <Dialog open={open}>
      {/* <DialogContent className="sm:max-w-[425px]"> */}
      <DialogContent className=" max-w-sm sm:max-w-[550px]">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogHeader>
            <DialogTitle>Add company details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 mx-auto">
            <div>
              <Label htmlFor="nome">Company name</Label>
              <Input
                type="text"
                id="nome"
                placeholder="my company"
                {...register("Nome", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="settoreLavoro">Work field</Label>
              <Input
                type="text"
                id="settoreLavoro"
                placeholder="Tech"
                {...register("SettoreLavoro", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="PartitaIva">Vat Number</Label>
              <Input
                type="text"
                id="PartitaIva"
                placeholder="1234..."
                {...register("PartitaIva", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="via">Route</Label>
              <Input
                type="text"
                id="via"
                placeholder="J.F.Kennedy"
                {...register("Via", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="NumeroCivico">Street number</Label>
              <Input
                type="text"
                id="NumeroCivico"
                placeholder="17"
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

export default CeoDialogForm;
