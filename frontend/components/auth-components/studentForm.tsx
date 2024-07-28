"use client";

import AnimateComponent from "./AnimateComponent";
import { useState } from "react";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { studentRegisterSchema } from "@/schema/RegisterSchema";
import { Button } from "../ui/button";
import { ArrowDown, ChevronRightIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

type Inputs = z.infer<typeof studentRegisterSchema>;

type fieldName = keyof Inputs;

const studentSteps = [
  {
    id: 0,
    title: "Choose the college in wich you are studying",
    field: "collegeName",
  },
  {
    id: 1,
    title: "Enter your student ID",
    field: "studentID",
  },
  {
    id: 2,
    title: "Enter your name",
    field: "firstName",
  },
  {
    id: 3,
    title: "Enter your surname",
    field: "lastName",
  },
  {
    id: 4,
    title: "Enter your email",
    field: "email",
  },
  {
    id: 5,
    title: "Enter your password",
    field: "password",
  },
  {
    id: 6,
    title: "That's it! You're all set 🎉",
  },
];
const StudentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(studentRegisterSchema),
  });

  const nextStep = async () => {
    const field = studentSteps[currentStep].field;
    const output = await trigger(field as fieldName, { shouldFocus: true });

    if (!output) return;

    setCurrentStep(currentStep + 1);

    if (currentStep === studentSteps.length - 2) {
      await handleSubmit(processForm)();
    }
  };

  const processForm: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
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
            <h1 className="font-bold text-4xl ">
              {studentSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="text"
                id="collegeName"
                {...register("collegeName")}
                size={50}
                className="text-center"
              />

              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown size={24} />
              </Button>
            </div>
            {errors[studentSteps[currentStep].field as fieldName] && (
              <p className="text-red-500">
                {errors[studentSteps[currentStep].field as fieldName]?.message}
              </p>
            )}
          </div>
        </AnimateComponent>
      )}

      {currentStep === 1 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-5xl ">
              {studentSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="text"
                id="studentID"
                {...register("studentID")}
                size={50}
                className="text-center"
              />

              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown size={24} />
              </Button>
            </div>
            {errors[studentSteps[currentStep].field as fieldName] && (
              <p className="text-red-500">
                {errors[studentSteps[currentStep].field as fieldName]?.message}
              </p>
            )}
          </div>
        </AnimateComponent>
      )}

      {currentStep === 2 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-5xl ">
              {studentSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="text"
                id="firstName"
                {...register("firstName")}
                size={50}
                className="text-center"
              />

              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown size={24} />
              </Button>
            </div>
            {errors[studentSteps[currentStep].field as fieldName] && (
              <p className="text-red-500">
                {errors[studentSteps[currentStep].field as fieldName]?.message}
              </p>
            )}
          </div>
        </AnimateComponent>
      )}

      {currentStep === 3 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-5xl ">
              {studentSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="text"
                id="lastName"
                {...register("lastName")}
                size={50}
                className="text-center"
              />

              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown size={24} />
              </Button>
            </div>
            {errors[studentSteps[currentStep].field as fieldName] && (
              <p className="text-red-500">
                {errors[studentSteps[currentStep].field as fieldName]?.message}
              </p>
            )}
          </div>
        </AnimateComponent>
      )}

      {currentStep === 4 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-5xl ">
              {studentSteps[currentStep].title}
            </h1>
            <div className=" flex items-center gap-4">
              <Input
                type="text"
                id="email"
                {...register("email")}
                size={50}
                className="text-center"
              />

              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown size={24} />
              </Button>
            </div>
            {errors[studentSteps[currentStep].field as fieldName] && (
              <p className="text-red-500">
                {errors[studentSteps[currentStep].field as fieldName]?.message}
              </p>
            )}
          </div>
        </AnimateComponent>
      )}

      {currentStep === 5 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-5xl ">
              {studentSteps[currentStep].title}
            </h1>
            <div className=" flex items-center  justify-center gap-4">
              <Input
                type="password"
                id="password"
                {...register("password")}
                size={50}
                className="text-center"
              />

              <Button onClick={nextStep} variant={"outline"}>
                <ArrowDown size={24} />
              </Button>
            </div>
            {errors[studentSteps[currentStep].field as fieldName] && (
              <p className="text-red-500">
                {errors[studentSteps[currentStep].field as fieldName]?.message}
              </p>
            )}
          </div>
        </AnimateComponent>
      )}

      {currentStep === 6 && (
        <AnimateComponent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="font-bold text-5xl ">
              {studentSteps[currentStep].title}
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

export default StudentForm;
