"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { buttonVariants } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const CreateCaseButton = () => {
    const pathname = usePathname();
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        if (pathname.includes('configure')) {
            setShow(false);
        }
        else {
            setShow(true);
        }
    }, [pathname])



    return (

        <>
            {show ?
                <Link href={'/configure/upload'} className={cn(buttonVariants({ variant: 'default' }), "flex items-center justify-center gap-2")}>
                    Create case
                    <ArrowRight className='w-5 h-4 shrink-0' />
                </Link>
                : <> </>}
        </>
    )
}

export default CreateCaseButton