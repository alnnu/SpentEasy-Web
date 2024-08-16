"use client"
import React, { use, useState } from "react";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";

import NavButton from "./navButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FiLogOut, FiMenu } from "react-icons/fi";
import LogOutButton from "./logOutButton";

function Navegation() {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();

  const isMobile = useMedia("(max-width: 1024px)", false);

  const routes: { link: string; label: string }[] = [
    {
      link: "/",
      label: "Dashboard",
    },
    {
      link: "/transaction",
      label: "Transaction",
    },
    {
      link: "/categories",
      label: "Categories",
    },
    {
      link: "/accounts",
      label: "Accounts",
    },
    {
      link: "/setting",
      label: "Setting",
    },
  ];

  const pathname = usePathname();

  const onClick = (link: string) => {
    router.push(link);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transtion"
          >
            <FiMenu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
             <Button 
              key={route.link}
              variant={route.link == pathname? "secondary" : "ghost"}
              onClick={() => onClick(route.link)}
              className="w-full justify-start"
             >{route.label}</Button>
            ))}
            <LogOutButton 
              variant="ghost"
              className="w-full justify-start"
             />
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.link}
          href={route.link}
          label={route.label}
          isActive={pathname == route.link}
        />
      ))}
    </nav>
  );
}

export default Navegation;
