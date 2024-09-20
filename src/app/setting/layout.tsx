import React from 'react'
import SettingHeader from "@/components/layout/settingHeader";

function DashboradLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <main>
                <SettingHeader/>
                <div className='px-3 lg:px-14'>
                    {children}
                </div>
            </main>
        </>
    )
}

export default DashboradLayout