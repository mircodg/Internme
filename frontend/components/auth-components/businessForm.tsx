"use client";

import AnimateComponent from "./AnimateComponent";
import { useState } from "react";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { businessRegisterSchema } from "@/schema/RegisterSchema";
import { Button } from "../ui/button";
import { ArrowDown, ChevronRightIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

type Inputs = z.infer<typeof businessRegisterSchema>;
type fieldName = keyof Inputs;

const businessSteps = [
  {
    id: 0,
    title: "Enter the company name",
    field: "companyName",
  },
  {
    id: 1,
    title: "Enter your email",
    field: "email",
  },
  {
    id: 2,
    title: "Enter your password",
    field: "password",
  },
  {
    id: 3,
    title: "That's it! You're all set 🎉",
  },
];

const BusinessForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(businessRegisterSchema),
  });

  const nextStep = async () => {
    const field = businessSteps[currentStep].field;
    const isValid = await trigger(field as fieldName, { shouldFocus: true });

    if (!isValid) return;

    setCurrentStep((prev) => prev + 1);

    if (currentStep === businessSteps.length - 2) {
      handleSubmit(processForm)();
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
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-items-center items-center gap-4">
              <Input
                className="text-center"
                type="text"
                {...register("companyName")}
                size={50}
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
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-items-center items-center gap-4">
              <Input
                className="text-center"
                type="text"
                {...register("email")}
                size={50}
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
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-items-center items-center gap-4">
              <Input
                className="text-center"
                type="password"
                {...register("password")}
                size={50}
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
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
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

export default BusinessForm;
