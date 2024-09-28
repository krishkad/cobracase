import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { options } from '@/lib/auth'
import { signOut } from 'next-auth/react'

const NavButtons = async () => {
    const session = await getServerSession(options);
    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <div className="flex gap-2 sm:gap-4 items-center justify-center">
            {!session ?
                <Link href={'/api/auth/signin'} className={cn(buttonVariants({ variant: "ghost" }))}>
                    Sign in
                </Link>
                :
                // <Link href={'/api/auth/signout?callbackUrl=/'} className={cn(buttonVariants({ variant: "ghost" }))}>
                //     Sign out
                // </Link>
                <Button variant={'ghost'} onClick={handleLogout}>
                    Sign out
                </Button>
            }
            <Link href={'/'} className={cn(buttonVariants({ variant: 'default' }), "flex items-center justify-center gap-2")}>
                Create case
                <ArrowRight className='w-5 h-4 shrink-0' />
            </Link>
        </div>
    )
}

export default NavButtons