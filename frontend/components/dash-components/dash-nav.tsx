"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  LucideIcon,
  Settings,
  PanelLeft,
  University,
  Handshake,
  BriefcaseBusiness,
  MessageCircle,
  FilePen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";

import Image from "next/image";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

type NavItem = {
  title: string;
  icon: LucideIcon;
  href: string;
};

const student: NavItem[] = [
  {
    title: "Internships",
    icon: BriefcaseBusiness,
    href: "/dashboard/student/internships",
  },
  {
    title: "Applications",
    icon: FilePen,
    href: "/dashboard/student/applications",
  },
  {
    title: "Feedbacks",
    icon: MessageCircle,
    href: "/dashboard/student/feedbacks",
  },
];

const director: NavItem[] = [
  {
    title: "University",
    icon: University,
    href: "/dashboard/director/university",
  },
  {
    title: "Conventions",
    icon: Handshake,
    href: "/dashboard/director/conventions",
  },
  {
    title: "Analytics",
    icon: LineChart,
    href: "/dashboard/director/analytics",
  },
];

const ceo: NavItem[] = [
  {
    title: "Internships",
    icon: BriefcaseBusiness,
    href: "/dashboard/ceo/internships",
  },
  {
    title: "Applications",
    icon: FilePen,
    href: "/dashboard/ceo/applications",
  },
  {
    title: "Feedbacks",
    icon: MessageCircle,
    href: "/dashboard/ceo/feedbacks",
  },
];

interface CustomDashboardNavbarProps {
  role: "student" | "director" | "ceo";
  children: React.ReactNode;
}

function CustomDashboardNavbar({ role, children }: CustomDashboardNavbarProps) {
  const mapItem =
    role === "student" ? student : role === "director" ? director : ceo;

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout", {
        withCredentials: true,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Home className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">InternMe</span>
          </Link>
          <TooltipProvider>
            {mapItem.map((item) => (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">InternMe</span>
                </Link>
                {mapItem.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            /> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/user-placeholder.jpg"
                  width={90}
                  height={90}
                  alt="Avatar"
                  className="rounded-full overflow-hidden"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default CustomDashboardNavbar;
