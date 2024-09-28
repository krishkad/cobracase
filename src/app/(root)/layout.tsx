import Navbar from '@/components/shared/navbar'
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full">
            <Navbar type='root' />
            {children}
        </main>
    )
}

export default RootLayout