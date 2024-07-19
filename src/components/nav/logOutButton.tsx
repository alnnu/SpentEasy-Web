"use client"
import React from 'react'
import { Button } from '../ui/button'
import { FiLogOut } from 'react-icons/fi'
import { signOut } from 'next-auth/react'

function LogOutButton({className, variant}: {className: string, variant: "link" | "outline" | "default" | "destructive" | "secondary" | "ghost" | null | undefined}) {

    return (
        <Button
            className={className}
            size="sm"
            variant={variant}
        >
            <FiLogOut className="size-4" onClick={() =>signOut({callbackUrl: "/signin"})}/>
        </Button>
  )
}

export default LogOutButton