"use client";
import React, { useState } from "react";
import NewAccountSheet from "./newAccountSheet";
import { Button } from "../ui/button";

function NewAccountSheetProvider() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    <Button onClick={() => setOpen(!isOpen)}>
        Create Accounts
    </Button>
    <NewAccountSheet isOpen={isOpen} setIsOpen={setOpen}/>
    </>
  )
  
}

export default NewAccountSheetProvider;
