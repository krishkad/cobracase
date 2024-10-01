import React, { ReactNode } from 'react'
import Navbar from '@/components/shared/navbar'
import { Toaster } from "@/components/ui/toaster"

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full">
            <Navbar type='root' />
            {children}
            <Toaster />
        </main>
    )
}

export default RootLayout