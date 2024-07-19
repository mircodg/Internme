import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Apple",
    body: " ",
    img: "Apple-logo.svg",
  },
  {
    name: "Spotify",
    body: "",
    img: "Spotify-logo.svg",
  },
  {
    name: "Tesla",
    body: "",
    img: "Tesla-logo.svg",
  },
  {
    name: "Google",
    body: "",
    img: "Google-logo.svg",
  },
  {
    name: "Netflix",
    body: "",
    img: "Netflix-logo.svg",
  },
  {
    name: "Meta",
    body: "",
    img: "Meta-logo.svg",
  },
  {
    name: "Amazon",
    body: "",
    img: "Amazon-logo.svg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const MarqueeVertical = () => {
  return (
    <div className="relative flex h-96 flex-row items-center justify-center overflow-hidden rounded-lg  bg-background sm:px-20 ">
      <Marquee vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div> */}
    </div>
  );
};

export default MarqueeVertical;
