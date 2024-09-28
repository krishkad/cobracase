import Navbar from '@/components/shared/navbar'
import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full">
            <Navbar type='auth' />
            {children}
        </main>
    )
}

export default AuthLayout