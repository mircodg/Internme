import Link from "next/link";
import MarqueeVertical from "./MarqueeEffect";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Button } from "../ui/button";
import { FlipWordsEffect } from "./FlipWord";

const LandingHeroSection = () => {
  return (
    <section role="hero">
      <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 antialiased">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 text-center lg:text-left gap-4">
          <div className="flex flex-col gap-6 items-center justify-center lg:justify-normal lg:items-start">
            <header className="font-extrabold tracking-tight text-4xl lg:text-6xl">
              <div className="flex items-center justify-center text-balance lg:justify-normal">
                <h1>
                  Your next
                  <FlipWordsEffect />
                  <br />
                  is just few clicks away
                </h1>
              </div>
            </header>
            <p className=" text-balance text-muted-foreground  text-sm md:text-2xl leading-normal">
              No matter if you are a student or a business we have something for{" "}
              <span className=" font-semibold">you</span>
            </p>
            <div className="flex items-center justify-center md:items-start md:justify-normal gap-4">
              <Link href="/auth/login">
                <Button>Get Started</Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="secondary">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <MarqueeVertical />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default LandingHeroSection;
