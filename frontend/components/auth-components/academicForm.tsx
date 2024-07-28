"use client";

import AnimateComponent from "./AnimateComponent";
import { useState } from "react";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { academicRegisterSchema } from "@/schema/RegisterSchema";
import { Button } from "../ui/button";
import { ArrowDown, ChevronRightIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

const academicSteps = [
  {
    id: "Step 1",
    title: "Enter the college name",
    field: "collegeName",
  },
  {
    id: "Step 2",
    title: "Enter your email",
    field: "email",
  },
  {
    id: "Step 3",
    title: "Enter your password",
    field: "password",
  },
  {
    id: "Step 4",
    title: "That's it! You're all set 🎉 ",
  },
];

type Inputs = z.infer<typeof academicRegisterSchema>;
type fieldName = keyof Inputs;

const AcademicForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(academicRegisterSchema),
  });

  const nextStep = async () => {
    const field = academicSteps[currentStep].field;
    const output = await trigger(field as fieldName, { shouldFocus: true });

    if (!output) return;

    setCurrentStep((prev) => prev + 1);

    if (currentStep === academicSteps.length - 2) {
      await handleSubmit(processForm)();
    }
  };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    toast({
      title: "Account created",
      description: "Your account has been created successfully",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      {currentStep === 0 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-7xl">
              {academicSteps[currentStep].title}
            </h1>
            <div className=" flex items-center  gap-4">
              <Input
                type="text"
                {...register("collegeName")}
                size={50}
                className="text-center"
              />
              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown />
              </Button>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 1 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-7xl">
              {academicSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="email"
                {...register("email")}
                size={50}
                className="text-center"
              />
              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown />
              </Button>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 2 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-7xl">
              {academicSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="password"
                {...register("password")}
                size={50}
                className="text-center"
              />
              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown />
              </Button>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 3 && (
        <AnimateComponent>
          <div className="flex flex-col gap-8 items-center justify-center">
            <h1 className="font-bold text-7xl">
              {academicSteps[currentStep].title}
            </h1>
            <Link href={"/dashboard"}>
              <Button variant={"outline"} asChild className="group">
                <div className="flex justify-center items-center gap-2">
                  <span>Go to dashboard</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Button>
            </Link>
          </div>
        </AnimateComponent>
      )}
    </form>
  );
};

export default AcademicForm;
