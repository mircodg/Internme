"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import AnimateComponent from "./AnimateComponent";
import StudentForm from "./studentForm";
import AcademicForm from "./academicForm";
import BusinessForm from "./businessForm";

const RegisterTypeform = () => {
  const [visible, setVisibility] = useState(true);
  const [accountType, setAccountType] = useState("");

  return (
    <AnimatePresence>
      {visible && (
        <AnimateComponent>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-7xl font-bold">Welcome 👋</h1>
            <Select
              onValueChange={(value) => {
                setAccountType(value);
                setVisibility(!visible);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </AnimateComponent>
      )}

      {accountType === "student" && <StudentForm />}

      {accountType === "academic" && <AcademicForm />}

      {accountType === "business" && <BusinessForm />}
    </AnimatePresence>
  );
};

export default RegisterTypeform;
