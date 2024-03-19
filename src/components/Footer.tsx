import { Button } from "@/components/ui";
import Image from "next/image";

const LANGUAGES = [
  {
    name: "Croatian",
    flag: "/hr.svg",
  },
  {
    flag: "/it.svg",
    name: "Italian",
  },
  {
    flag: "/jp.svg",
    name: "Japanese",
  },
  {
    flag: "/fr.svg",
    name: "French",
  },
  {
    flag: "/es.svg",
    name: "Spanish",
  },
];

export const Footer = () => (
  <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
    <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
      {LANGUAGES.map(({ flag, name }) => (
        <Button size="lg" variant="ghost" className="w-full" key={name}>
          <Image
            src={flag}
            alt="Croatian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          {name}
        </Button>
      ))}
    </div>
  </footer>
);
