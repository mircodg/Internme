"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div>
      <h1 className="text-5xl lg:text-7xl font-bold text-center tracking-tight text-balance mt-16 !leading-tight bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600 bg-gradient-to-b from-black to-gray-400/70">
        Welcome to internMe
      </h1>
      <p className="text-center text-gray-500">
        developed by <span className="text-slate-500">mircodev</span>
      </p>
      <BackgroundBeams />
    </div>
  );
}
