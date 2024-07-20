"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const loginSteps = [
  {
    accountType: "student",
    steps: [
      {
        id: "Step 1",
        title: "Choose the college in wich you are studying",
      },
      {
        id: "Step 2",
        title: "Enter your student ID",
      },
      {
        id: "Step 3",
        title: "Enter your name",
      },
      {
        id: "Step 4",
        title: "Enter your email",
      },
      {
        id: "Step 5",
        title: "Enter your password",
      },
      {
        id: "Step 6",
        title: "That's it! You're all set",
      },
    ],
  },
  {
    accountType: "academic",
    steps: [
      {
        id: "Step 1",
        title: "Enter the college name",
      },
      {
        id: "Step 2",
        title: "Enter your email",
      },
      {
        id: "Step 3",
        title: "Enter your password",
      },
      {
        id: "Step 4",
        title: "That's it! You're all set",
      },
    ],
  },
  {
    accountType: "business",
    steps: [
      {
        id: "Step 1",
        title: "Enter the company name",
      },
      {
        id: "Step 2",
        title: "Enter your email",
      },
      {
        id: "Step 3",
        title: "Enter your password",
      },
      {
        id: "Step 4",
        title: "That's it! You're all set",
      },
    ],
  },
];

const LoginTypeform = () => {
  const [step, setStep] = useState(0);
  const [accountType, setAccountType] = useState("");
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 50, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      HI
    </motion.div>
  );
};

export default LoginTypeform;
