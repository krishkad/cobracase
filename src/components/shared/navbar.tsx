'use client'
import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import Image from 'next/image'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import NavButtons from './nav-buttons'

const Navbar =  () => {
    const pathname = usePathname()
    return (
        <div className='w-full z-50 sticky top-0 bg-slate-50/75 backdrop-blur-md'>
            <MaxWidthWrapper className='h-16 flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src={'/snake-1.png'} width={0} height={0} className='w-9 h-9 object-contain' unoptimized={true} alt='cobra case logo' />
                </Link>

                {!pathname.includes('auth') ?
                    <NavButtons />
                    :
                    <Link href={'/'} className={cn(buttonVariants({ variant: "outline", className: "flex items-center justify-center gap-2" }))} >
                        <ArrowLeft className='w-4 h-4' />
                        Exit
                    </Link>
                }
            </MaxWidthWrapper>
        </div >
    )
}

export default Navbar