// "use client";

// import AnimateComponent from "./AnimateComponent";
// import { useState } from "react";
// import z from "zod";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { academicRegisterSchema } from "@/schema/RegisterSchema";
// import { Button } from "../ui/button";
// import { ArrowDown, ChevronRightIcon } from "lucide-react";
// import { useToast } from "../ui/use-toast";
// import Link from "next/link";
// import axios from "axios";
// import { LoaderCircle } from "lucide-react";

// const academicSteps = [
//   {
//     id: "Step 1",
//     title: "Enter the college name",
//     field: "NomeUniversità",
//   },
//   {
//     id: "Step 2",
//     title: "Enter your email",
//     field: "Email",
//   },
//   {
//     id: "Step 3",
//     title: "Enter your password",
//     field: "Password",
//   },
//   {
//     id: "Step 4",
//     title: "That's it! You're all set 🎉 ",
//   },
// ];

// type Inputs = z.infer<typeof academicRegisterSchema>;
// type fieldName = keyof Inputs;

// const AcademicForm = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [status, setStatus] = useState<Number>();
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     reset,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(academicRegisterSchema),
//   });

//   const nextStep = async () => {
//     const field = academicSteps[currentStep].field;
//     const output = await trigger(field as fieldName, { shouldFocus: true });

//     if (!output) return;

//     setCurrentStep((prev) => prev + 1);

//     if (currentStep === academicSteps.length - 2) {
//       await handleSubmit(processForm)();
//     }
//   };

//   const processForm: SubmitHandler<Inputs> = async (data) => {
//     try {
//       await axios.post("http://localhost:8000/api/register", data);
//       setStatus(200);
//       toast({
//         title: "Account created successfully!",
//         description: "You can now login.",
//       });
//     } catch {
//       toast({
//         title: "Uh oh! Something went wrong.",
//         description: "There was a problem with your request.",
//         variant: "destructive",
//       });
//       setStatus(500);
//     } finally {
//       setIsLoading(!isLoading);
//     }

//     reset();
//   };

//   return (
//     <form onSubmit={handleSubmit(processForm)}>
//       {currentStep === 0 && (
//         <AnimateComponent>
//           <div className="flex flex-col gap-4 items-center justify-center">
//             <h1 className="font-bold text-7xl">
//               {academicSteps[currentStep].title}
//             </h1>
//             <div className=" flex items-center  gap-4">
//               <Input
//                 type="text"
//                 {...register("NomeUniversità")}
//                 size={50}
//                 className="text-center"
//               />
//               <Button onClick={nextStep} variant={"outline"}>
//                 <ArrowDown />
//               </Button>
//             </div>
//           </div>
//         </AnimateComponent>
//       )}

//       {currentStep === 1 && (
//         <AnimateComponent>
//           <div className="flex flex-col gap-4 items-center justify-center">
//             <h1 className="font-bold text-7xl">
//               {academicSteps[currentStep].title}
//             </h1>
//             <div className=" flex items-center gap-4">
//               <Input
//                 type="email"
//                 {...register("Email")}
//                 size={50}
//                 className="text-center"
//               />
//               <Button onClick={nextStep} variant={"outline"}>
//                 <ArrowDown />
//               </Button>
//             </div>
//           </div>
//         </AnimateComponent>
//       )}

//       {currentStep === 2 && (
//         <AnimateComponent>
//           <div className="flex flex-col gap-4 items-center justify-center">
//             <h1 className="font-bold text-7xl">
//               {academicSteps[currentStep].title}
//             </h1>
//             <div className=" flex items-center gap-4">
//               <Input
//                 type="password"
//                 {...register("Password")}
//                 size={50}
//                 className="text-center"
//               />
//               <Button onClick={nextStep} variant={"outline"}>
//                 <ArrowDown />
//               </Button>
//             </div>
//           </div>
//         </AnimateComponent>
//       )}

//       {currentStep === 3 && (
//         <AnimateComponent>
//           {isLoading && (
//             <div className="flex flex-col gap-8 justify-center items-center">
//               <LoaderCircle className="w-16 h-16 animate-spin" />
//             </div>
//           )}
//           {!isLoading && status === 200 && (
//             <div className="flex flex-col gap-8 justify-center items-center">
//               <h1 className="text-7xl font-bold">
//                 {academicSteps[currentStep].title}
//               </h1>
//               <Link href={"/dashboard"}>
//                 <Button variant={"outline"} asChild className="group">
//                   <div className="flex justify-center items-center gap-2">
//                     <span>Login</span>
//                     <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                   </div>
//                 </Button>
//               </Link>
//             </div>
//           )}
//           {!isLoading && status === 500 && (
//             <div className="flex flex-col gap-8 justify-center items-center">
//               <h1 className="text-7xl font-bold">Something went wrong 🥺</h1>
//               <Link href={"/"}>
//                 <Button variant={"outline"} asChild className="group">
//                   <div className="flex justify-center items-center gap-2">
//                     <span>Home</span>
//                     <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                   </div>
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </AnimateComponent>
//       )}

//     </form>
//   );
// };

// export default AcademicForm;

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
import axios from "axios";
import { LoaderCircle } from "lucide-react";

type Inputs = z.infer<typeof academicRegisterSchema>;
type fieldName = keyof Inputs;

const businessSteps = [
  {
    id: 0,
    title: "Enter your name",
    field: "Nome",
  },
  {
    id: 1,
    title: "Enter your surname",
    field: "Cognome",
  },
  {
    id: 2,
    title: "Enter your birth date",
    field: "DataNascita",
  },
  {
    id: 3,
    title: "Enter your email",
    field: "Email",
  },
  {
    id: 4,
    title: "Enter your password",
    field: "Password",
  },
  {
    id: 5,
    title: "That's it! You're all set 🎉",
  },
];

const AcademicForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<Number>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(academicRegisterSchema),
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
    try {
      await axios.post("http://localhost:8000/api/register", data);
      setStatus(200);
      toast({
        title: "Account created successfully!",
        description: "You can now login.",
      });
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
      setStatus(500);
    } finally {
      setIsLoading(!isLoading);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      {currentStep === 0 && (
        <AnimateComponent>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col justify-center gap-4">
                <Input
                  className="text-center"
                  type="text"
                  {...register("Nome")}
                  size={50}
                />
                {errors.Nome && (
                  <p className="text-red-500 text-sm">{errors.Nome?.message}</p>
                )}
              </div>
              <div>
                <Button onClick={nextStep} variant={"outline"}>
                  <ArrowDown />
                </Button>
              </div>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 1 && (
        <AnimateComponent>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col justify-center gap-4">
                <Input
                  className="text-center"
                  type="text"
                  {...register("Cognome")}
                  size={50}
                />
                {errors.Cognome && (
                  <p className="text-red-500 text-sm">
                    {errors.Cognome?.message}
                  </p>
                )}
              </div>
              <div>
                <Button onClick={nextStep} variant={"outline"}>
                  <ArrowDown />
                </Button>
              </div>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 2 && (
        <AnimateComponent>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col justify-center gap-4">
                <Input
                  className="text-center"
                  type="date"
                  {...register("DataNascita")}
                  size={50}
                />
                {errors.DataNascita && (
                  <p className="text-red-500 text-sm">
                    {errors.DataNascita?.message}
                  </p>
                )}
              </div>
              <div>
                <Button onClick={nextStep} variant={"outline"}>
                  <ArrowDown />
                </Button>
              </div>
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
            <div className="flex justify-center gap-4">
              <div className="flex flex-col justify-center gap-4">
                <Input
                  className="text-center"
                  type="text"
                  {...register("Email")}
                  size={50}
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm">
                    {errors.Email?.message}
                  </p>
                )}
              </div>
              <div>
                <Button onClick={nextStep} variant={"outline"}>
                  <ArrowDown />
                </Button>
              </div>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 4 && (
        <AnimateComponent>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-7xl font-bold">
              {businessSteps[currentStep].title}
            </h1>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col justify-center gap-4">
                <Input
                  className="text-center"
                  type="text"
                  {...register("Password")}
                  size={50}
                />
                {errors.Password && (
                  <p className="text-red-500 text-sm">
                    {errors.Password?.message}
                  </p>
                )}
              </div>
              <div>
                <Button onClick={nextStep} variant={"outline"}>
                  <ArrowDown />
                </Button>
              </div>
            </div>
          </div>
        </AnimateComponent>
      )}

      {currentStep === 5 && (
        <AnimateComponent>
          {isLoading && (
            <div className="flex flex-col gap-8 justify-center items-center">
              <LoaderCircle className="w-16 h-16 animate-spin" />
            </div>
          )}
          {!isLoading && status === 200 && (
            <div className="flex flex-col gap-8 justify-center items-center">
              <h1 className="text-7xl font-bold">
                {businessSteps[currentStep].title}
              </h1>
              <Link href={"/dashboard"}>
                <Button variant={"outline"} asChild className="group">
                  <div className="flex justify-center items-center gap-2">
                    <span>Login</span>
                    <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </div>
          )}
          {!isLoading && status === 500 && (
            <div className="flex flex-col gap-8 justify-center items-center">
              <h1 className="text-7xl font-bold">Something went wrong 🥺</h1>
              <Link href={"/"}>
                <Button variant={"outline"} asChild className="group">
                  <div className="flex justify-center items-center gap-2">
                    <span>Home</span>
                    <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </div>
          )}
        </AnimateComponent>
      )}
    </form>
  );
};

export default AcademicForm;
