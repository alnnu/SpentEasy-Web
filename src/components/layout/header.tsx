import Link from "next/link";
import React from "react";

import Navegation from "../nav/navegation";
import LogOutButton from "../nav/logOutButton";
import WelcomeMsg from "../welcomeMsg";

function Header() {
  return (
    <header className="bg-blue-700 px-4 lg:px-14 pt-8  pb-36">
      <div className="flex flex-col">
        <div className="w-full lg:flex items-center lg:justify-between mb-14">
          <div className="flex justify-between gap-16">
            <div className="text-2xl text-white font-bold">
              <Link href="/">Spent Easy</Link>
            </div>
            <Navegation />
          </div>
          <div className="lg:block hidden">
            <LogOutButton
              variant="outline"
              className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transtion"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <WelcomeMsg/>
        </div>
      </div>
    </header>
  );
}

export default Header;
