import React from 'react'

import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import AccountForm from './accout-form';

function NewAccountSheet({isOpen, setIsOpen}: {isOpen: boolean,  setIsOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void;}) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>
            New Accout
          </SheetTitle>
          <SheetDescription>
            Create a new account to track your transaction.
          </SheetDescription>
        </SheetHeader>
        <AccountForm id={undefined}/>
      </SheetContent>
    </Sheet>
  )
}

export default NewAccountSheet