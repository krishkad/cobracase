import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Phone = ({ SrcImg, className }: { SrcImg: string, className?: string }) => {
    return (
        <div className={cn("relative pointer-events-none z-40 overflow-hidden w-64", className)}>
            <Image
                width={0}
                height={0}
                src={'/phone-template-white-edges.png'}
                className='pointer-events-none z-40 select-none min-w-full min-h-full'
                quality={90}
                priority
                placeholder='empty'
                unoptimized={true}
                alt='image template'
            />
            <div className="absolute -z-10 inset-0">
                <Image
                    width={0}
                    height={0}
                    src={SrcImg}
                    className='object-cover min-w-full min-h-full'
                    quality={90}
                    priority
                    alt='hours'
                    unoptimized={true}
                />
            </div>
        </div>
    )
}

export default Phone