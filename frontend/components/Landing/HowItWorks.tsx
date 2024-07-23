"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button } from "../ui/button";
import { useState } from "react";

const student = [
  {
    step: 1,
    title: "Register",
    description:
      "Create an account with your email address, and password. Then select your academic organization.",
  },
  {
    step: 2,
    title: "Upload your resume",
    description:
      "Easily upload your resume, then search for internships offers. You can eventually filter them by location, degree and more.",
  },
  {
    step: 3,
    title: "Apply",
    description:
      "Apply to the internship you like with a single click. The visible options are from organizations that have a convection with your academic organization.",
  },
];

const academic = [
  {
    step: 1,
    title: "Register",
    description:
      "Create an account with your email address, and password. Your data are encrypted and secure.",
  },
  {
    step: 2,
    title: "Manage your students",
    description:
      "Easily see how many and which of your students are logged in, and how many internships they applied to and with wich organizations.",
  },
  {
    step: 3,
    title: "Mangage convections",
    description:
      "Easily manage your convections with organizations, and see how many internships they offer to your students.",
  },
];

const business = [
  {
    step: 1,
    title: "Register",
    description:
      "Create an account with your email address, and password. Your data are encrypted and secure.",
  },
  {
    step: 2,
    title: "Post an internship",
    description:
      "Post a new internship offer, and wait for students to apply. You can check how many students applied, and see their resume.",
  },
  {
    step: 3,
    title: "Select the best",
    description:
      "Select the best candidate for your internship offer, and start working together.",
  },
];

const HowItWorks = () => {
  const [userType, setUserType] = useState(student);

  return (
    <section id="how-it-works">
      <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 antialiased">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-balance tracking-tight text-4xl lg:text-7xl">
            How it works
          </h1>
          <div className="flex justify-between gap-2 items-center mt-8 mx-4">
            <Button
              variant="outline"
              onClick={() => setUserType(student)}
              className={`p-4 rounded-full focus:bg-accent focus:text-accent-foreground ${
                userType === student ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              Student
            </Button>
            <Button
              variant="outline"
              onClick={() => setUserType(academic)}
              className="p-4 rounded-full focus:bg-accent focus:text-accent-foreground"
            >
              Academic
            </Button>
            <Button
              variant="outline"
              onClick={() => setUserType(business)}
              className="p-4 rounded-full focus:bg-accent focus:text-accent-foreground"
            >
              Business
            </Button>
          </div>
          <div className="grid lg:grid-cols-3  gap-10 md:gap-4 w-full text-center mt-10 p-3">
            {userType.map((step) => (
              <div key={step.step} className="flex flex-col gap-4">
                <div className="flex gap-2 items-center justify-center">
                  <div className="hidden lg:flex lg:items-center lg:justify-center bg-primary text-primary-foreground w-8 h-8 rounded-full ">
                    <span className="">{step.step}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-center">
                    {step.title}
                  </h2>
                </div>
                <p className=" text-muted-foreground leading-normal text-balance text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default HowItWorks;
