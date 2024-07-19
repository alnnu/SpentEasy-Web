import Header from '@/components/layout/header'
import React from 'react'

function DashboradLayout({children} : {children: React.ReactNode}) {
  return (
    <>
        <main>
            <Header/>
            <div className='px-3 lg:px-14'>
                {children}
            </div>
        </main>
    </>
  )
}

export default DashboradLayout