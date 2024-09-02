"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";
import CeoConventionList from "../_components/ceoConventionList";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
// import { DialogDescription } from "@radix-ui/react-dialog";

export type convention = {
  UniversityName: string;
  Status: "Active" | "Pending" | "Rejected" | "Expired";
  date: string;
};

function CeoConventionsPage() {
  const [conventionsList, setConventionList] = useState<convention[]>([]);
  const [availableUniversities, setAvailableUniversities] = useState<string[]>(
    []
  );
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingUniversities, setLoadingUniversities] = useState<boolean>(true);
  const [universityName, setUniversityName] = useState<string>("");

  const addConvention = async (universityName: string) => {
    if (!universityName) return;
    try {
      await axios.post(
        `http://localhost:8000/api/company/convention/add/${universityName}`,
        null,
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchConventions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/company/conventions",
          { withCredentials: true }
        );
        if (response.status === 200) {
          const conventionArray = response.data.conventions;
          conventionArray.forEach((convention: any) => {
            const newConvention: convention = {
              UniversityName: convention.Nome,
              Status: convention.Stato,
              date: convention.DataStipulazione,
            };
            // se non è già presente, aggiungo la nuova convenzione
            if (
              !conventionsList.some(
                (element) =>
                  element.UniversityName === newConvention.UniversityName
              )
            ) {
              conventionsList.push(newConvention);
            }
          });
        }
      } catch (error) {
        console.error(error);
        setConventionList([]);
      } finally {
        setLoadingList(false);
      }
    };
    fetchConventions();

    const fetchAvailableUniversities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/company/conventions/available",
          { withCredentials: true }
        );
        if (response.status === 200) {
          const universitiesArray = response.data.universities;
          universitiesArray.forEach((university: any) => {
            const newUniversity: string = university.Nome;
            if (!availableUniversities.includes(newUniversity)) {
              availableUniversities.push(newUniversity);
            }
          });
        }
      } catch (error) {
        console.error(error);
        setAvailableUniversities([]);
      } finally {
        setLoadingUniversities(false);
      }
    };
    fetchAvailableUniversities();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <Tabs value="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1 hover:cursor-pointer"
                asChild
              >
                <div>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Convention
                  </span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-semibold text-xl">
                  Add a new convention
                </DialogTitle>
                <DialogDescription className="text-pretty">
                  Select an available university from the menu and click the add
                  button
                </DialogDescription>
              </DialogHeader>
              <Select
                onValueChange={(value) => {
                  setUniversityName(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select University"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableUniversities.length > 0 ? (
                      availableUniversities.map((university, index) => (
                        <SelectItem key={index} value={university}>
                          {university}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectLabel>No universities available</SelectLabel>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
                <Button onClick={() => addConvention(universityName)}>
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loadingList && loadingUniversities && <div>Loading...</div>}
      {!loadingList && !loadingUniversities && (
        <CeoConventionList
          firstColumn="University Name"
          secondColumn="Status"
          thirdColumn="Date"
          data={conventionsList}
        />
      )}
    </>
  );
}

export default CeoConventionsPage;
