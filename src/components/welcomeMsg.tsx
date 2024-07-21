'use client'
import { useSession } from "next-auth/react";
import React from "react";

function WelcomeMsg() {
  const session = useSession();
  const user = session.data?.user
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold">Welcome back {user?.name}!</h1>
      <p className="text-2xl">This is your online financial manager</p>
    </div>
  );
}

export default WelcomeMsg;
