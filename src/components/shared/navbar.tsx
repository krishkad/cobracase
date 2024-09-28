'use client'
import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import NavButtons from './nav-buttons'

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (pathname.includes('auth')) {
            setShow(true)
        } else {
            setShow(false);
        }
    }, [pathname])

    return (
        <div className='w-full z-50 sticky top-0 bg-slate-50/75 backdrop-blur-md'>
            <MaxWidthWrapper className='h-16 flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src={'/snake-1.png'} width={0} height={0} className='w-9 h-9 object-contain' unoptimized={true} alt='cobra case logo' />
                </Link>

                {!show ?
                    <NavButtons />
                    :
                    <Button variant={'outline'} onClick={() => router.push('/')} className={"flex items-center justify-center gap-2"} >
                        <ArrowLeft className='w-4 h-4' />
                        Exit
                    </Button>
                }
            </MaxWidthWrapper>
        </div >
    )
}

export default Navbar