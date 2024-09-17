import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addressSchema } from "@/schema/DialogSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import type { userInfo } from "@/components/settings-component-main/settings";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";

type formInputs = z.infer<typeof addressSchema>;

interface SettingsProps {
  user: userInfo | undefined;
  children: React.ReactNode;
}

function SettingsWrapper({ ...props }: SettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<formInputs>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmitHandler: SubmitHandler<formInputs> = async (
    data: formInputs
  ) => {
    if (props.user?.Address === null) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/api/user/address",
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast({
            description: response.data.message,
          });
          reset();
          setIsLoading(false);
          window.location.reload();
        }
      } catch (err: any) {
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await axios.put(
          "http://localhost:8000/api/user/address",
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast({
            description: response.data.message,
          });
          setIsLoading(false);
          reset();
          window.location.reload();
        }
      } catch (err: any) {
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* PERSONAL DATA */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Personal Data</CardTitle>
          <CardDescription>See your personal data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between gap-y-2">
            <div className=" min-w-[200px]">
              <Label className="font-bold">First Name</Label>
              <p>{props.user?.UserName}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Last Name</Label>
              <p>{props.user?.UserSurname}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Email</Label>
              <p>{props.user?.UserEmail}</p>
            </div>
            <div className=" min-w-[200px]">
              <Label className="font-bold">Birth Date</Label>
              <p>{props.user?.UserBirthDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ADDRESS + EDIT FORM */}

      <Dialog>
        <Card className="w-full mt-8">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-between items-center">
              Address
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 gap-1 hover:cursor-pointer"
                  asChild
                >
                  <div>
                    <Plus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {props.user?.Address ? "Update" : "Add"}
                    </span>
                  </div>
                </Button>
              </DialogTrigger>
            </CardTitle>
            <CardDescription>See and update your address</CardDescription>
          </CardHeader>
          <CardContent>
            {props.user?.Address ? (
              <div className="flex flex-wrap justify-between gap-y-2">
                <div className=" min-w-[200px]">
                  <Label className="font-bold">Route</Label>
                  <p>
                    {props.user.Address.Via} {props.user.Address.NumeroCivico}
                  </p>
                </div>
                <div className=" min-w-[200px]">
                  <Label className="font-bold">Zip Code</Label>
                  <p>{props.user.Address.CAP}</p>
                </div>
                <div className=" min-w-[200px]">
                  <Label className="font-bold">City</Label>
                  <p>{props.user.Address.Citta}</p>
                </div>
                <div className=" min-w-[200px]">
                  <Label className="font-bold">Province</Label>
                  <p>{props.user.Address.Provincia}</p>
                </div>
              </div>
            ) : (
              <p>Add your address !</p>
            )}
          </CardContent>
        </Card>
        <DialogContent className=" max-w-sm sm:max-w-[500px]">
          {/* ADDRESS FORM */}
          <form onSubmit={handleSubmit((data) => onSubmitHandler(data))}>
            <DialogHeader>
              {props.user?.Address === null ? (
                <DialogTitle>Add your address</DialogTitle>
              ) : (
                <DialogTitle>Update your address</DialogTitle>
              )}
              <DialogDescription>Add address details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 mx-auto">
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
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save address"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CHILDREN */}
      {props.children}
    </>
  );
}

export default SettingsWrapper;
