import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import Image from 'next/image'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const Navbar = () => {
    return (
        <div className='w-full z-50 sticky top-0 bg-slate-50/75 backdrop-blur-md'>
            <MaxWidthWrapper className='h-16 flex justify-between items-center'>
                <Image src={'/snake-1.png'} width={0} height={0} className='w-9 h-9 object-contain' unoptimized={true} alt='cobra case logo' />

                <div className="flex gap-2 sm:gap-4 items-center justify-center">
                    <Link href={'/'} className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:block")}>
                        Log in
                    </Link>
                    <Link href={'/'} className={cn(buttonVariants({ variant: "ghost" }))}>
                        Sign in
                    </Link>
                    <Link href={'/'} className={cn(buttonVariants({ variant: 'default' }), "flex items-center justify-center gap-2")}>
                        Create case
                        <ArrowRight className='w-5 h-4 shrink-0 hidden sm:block' />
                    </Link>
                </div>
            </MaxWidthWrapper >
        </div >
    )
}

export default Navbar