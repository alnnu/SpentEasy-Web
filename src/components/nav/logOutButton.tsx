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
            onClick={() =>signOut({callbackUrl: "/signin"})}
        >
            <FiLogOut className="size-4 " />
        </Button>
  )
}

export default LogOutButton