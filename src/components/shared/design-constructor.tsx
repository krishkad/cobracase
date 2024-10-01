"use client"
import React from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Rnd } from 'react-rnd'

const DesignConstructor = ({
    imageUrl,
    width,
    height
}: {
    imageUrl: string,
    width: number,
    height: number
}) => {
    return (
        <div className="w-full py-5">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="relative w-full h-[37.5rem] col-span-2 max-w-4xl border-2 border-dashed rounded-xl border-gray-400 flex items-center justify-center overflow-hidden">
                    <div className="relative w-60 pointer-events-none bg-opacity-50 aspect-[896/1831]">
                        <AspectRatio
                            className='relative pointer-events-none z-50 aspect-[896/1831] w-full'
                            ratio={896 / 1831}
                        >
                            <Image src="/phone-template-white-edges.png" fill alt="Image" className="rounded-[36px] object-cover z-50 select-none pointer-events-none" />
                        </AspectRatio>
                        <div className='absolute z-40 inset-0 top-px bottom-px left-[2px] right-[2px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                        <div className='absolute inset-0 top-px bottom-px left-[2px] right-[2px] rounded-[32px] bg-red-500' />
                    </div>
                    <Rnd
                        default={{
                            x: 250,
                            y: 250,
                            width: width / 4,
                            height: height / 4,
                        }}
                        lockAspectRatio
                    >
                        <div className="relative w-full h-full">
                            <Image src={imageUrl} unoptimized fill className='pointer-events-none' alt='image' />
                        </div>
                    </Rnd>
                </div>
            </div>
        </div>
    )
}

export default DesignConstructor