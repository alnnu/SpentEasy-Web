"use client";
import React, { useState } from "react";
import NewAccountSheet from "./newAccountSheet";
import { Button } from "../ui/button";

function NewAccountSheetProvider({ children, OnChangeHandler }: {children: React.ReactNode, OnChangeHandler: () => void}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    <Button size="sm" className="text-center" onClick={() => setOpen(!isOpen)}>
        {children}
    </Button>
    <NewAccountSheet isOpen={isOpen} setIsOpen={setOpen} OnChangeHandler={OnChangeHandler}/>
    </>
  )
  
}

export default NewAccountSheetProvider;
