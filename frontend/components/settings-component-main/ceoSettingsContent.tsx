import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { addressSchema } from "@/schema/DialogSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";

type formInputs = z.infer<typeof addressSchema>;

type CompanyData = {
  Nome: string;
  PartitaIva: string;
  SettoreLavoro: string;
};

type SiteData = {
  Via: string;
  NumeroCivico: number;
  CAP: number;
  Citta: string;
  Provincia: string;
};

function CeoSettingsContent() {
  const [companyData, setCompanyData] = useState<CompanyData>();
  const [sedi, setSedi] = useState<SiteData[]>([]);
  const hasFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<formInputs>({
    resolver: zodResolver(addressSchema),
  });

  const fetchCompanyAndSitesDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/company/sites",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const company: CompanyData = {
          Nome: response.data.company.Nome,
          PartitaIva: response.data.company.PartitaIva,
          SettoreLavoro: response.data.company.SettoreLavoro,
        };

        const companySitesArray = response.data.sites;
        companySitesArray.forEach((site: SiteData) => {
          setSedi((prev) => [...prev, site]);
        });
        setCompanyData(company);
      }
    } catch (err: any) {
      toast({
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const onSubmitHandler: SubmitHandler<formInputs> = async (
    data: formInputs
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/company/site/add",
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
      reset();
    }
  };

  const EditHandler = async (data: SiteData, previusSite: SiteData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/company/site/edit`,
        {
          Via: data.Via,
          NumeroCivico: data.NumeroCivico,
          CAP: data.CAP,
          Citta: data.Citta,
          Provincia: data.Provincia,
          OldVia: previusSite.Via,
          OldNumeroCivico: previusSite.NumeroCivico,
          OldCAP: previusSite.CAP,
          OldCitta: previusSite.Citta,
          OldProvincia: previusSite.Provincia,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({
          description: response.data.message,
        });
        window.location.reload();
      }
    } catch (err: any) {
      toast({
        description: err.response.data.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleRemoveSite = async (data: SiteData) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/company/site/remove`,
        {
          data: data,
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({
          description: response.data.message,
        });
        window.location.reload();
      }
    } catch (err: any) {
      toast({
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCompanyAndSitesDetails();
  }, []);

  return (
    <>
      <Dialog>
        <Card className="w-full mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Company Details</CardTitle>
            <CardDescription>See company informations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between gap-y-2">
              <div className=" min-w-[200px]">
                <Label className="font-bold">Name</Label>
                <p>{companyData?.Nome}</p>
              </div>
              <div className=" min-w-[200px]">
                <Label className="font-bold">VAT Number</Label>
                <p>{companyData?.PartitaIva}</p>
              </div>
              <div className=" min-w-[200px]">
                <Label className="font-bold">Working sector</Label>
                <p>{companyData?.SettoreLavoro}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mt-8">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-between items-center">
              Company Sites
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 gap-1 hover:cursor-pointer"
                  asChild
                >
                  <div>
                    <Plus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add
                    </span>
                  </div>
                </Button>
              </DialogTrigger>
            </CardTitle>
            <CardDescription>See and add company sites</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="grid grid-flow-row gap-y-2"> */}
            {sedi?.map((sede, index) => {
              return (
                <div
                  className="flex flex-wrap justify-between items-center gap-y-2"
                  key={index}
                >
                  <div className="min-w-[200px]">
                    <Label className="font-bold">Route</Label>
                    <p>
                      {sede.Via} {sede.NumeroCivico}
                    </p>
                  </div>
                  <div className=" min-w-[200px]">
                    <Label className="font-bold">Zip Code</Label>
                    <p>{sede.CAP}</p>
                  </div>
                  <div className=" min-w-[200px]">
                    <Label className="font-bold">City</Label>
                    <p>{sede.Citta}</p>
                  </div>
                  <div className=" min-w-[200px]">
                    <Label className="font-bold">Province</Label>
                    <p>{sede.Provincia}</p>
                  </div>
                  <div className="min-w-[200px] gap-y-2">
                    <Label className="font-bold">Actions</Label>
                    {/* <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemoveSite(sede)}
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div> */}
                    <div className="flex gap-2 items-center">
                      {/* TODO: DIALOG EDIT SITE*/}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="h-8 gap-1 hover:cursor-pointer"
                            variant={"ghost"}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Edit
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form
                            onSubmit={handleSubmit((data) =>
                              EditHandler(data, sede)
                            )}
                          >
                            <DialogHeader>
                              <DialogTitle>Edit site</DialogTitle>
                              <DialogDescription>
                                Add site details
                              </DialogDescription>
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
                                <Label htmlFor="NumeroCivico">
                                  Street Number
                                </Label>
                                <Input
                                  type="text"
                                  id="NumeroCivico"
                                  placeholder="10"
                                  {...register("NumeroCivico", {
                                    required: true,
                                  })}
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
                      <Button
                        size="sm"
                        className="h-8 gap-1 hover:cursor-pointer"
                        onClick={() => handleRemoveSite(sede)}
                        variant={"ghost"}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Remove
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* </div> */}
          </CardContent>
        </Card>
        <DialogContent className=" max-w-sm sm:max-w-[500px]">
          {/* ADDRESS FORM */}
          <form onSubmit={handleSubmit((data) => onSubmitHandler(data))}>
            <DialogHeader>
              <DialogTitle>Add company site</DialogTitle>
              <DialogDescription>Add site details</DialogDescription>
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
    </>
  );
}

export default CeoSettingsContent;
