import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsEffect() {
  const words = ["internship", "talent"];

  return (
    <div className="hidden lg:inline-block ">
      <FlipWords words={words} /> <br />
    </div>
  );
}
