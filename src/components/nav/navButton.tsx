 import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function NavButton({href, label, isActive}: {href: string, label: string, isActive: boolean}) {
  return (
    <Button 
        asChild 
        size="sm" 
        variant="outline" 
        className={cn(
            "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transtion",
            isActive ? "bg-white/10" : "bg-transparent"
        )}
        >
        <Link href={href}>{label}</Link>
    </Button>
  )
}

export default NavButton