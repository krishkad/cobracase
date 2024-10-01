"use client"
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'


const STEPS = [
    {
        title: "Step - 1: Upload Image",
        url: "/upload",
        description: "Choose and upload your preferred image."
    },
    {
        title: "Step - 2: Design your case",
        url: "/design",
        description: "Customize your case with creative designs."
    },
    {
        title: "Step - 3: Preview case",
        url: "/preview",
        description: "View the final design before purchase."
    }
];

const ProgressSteps = () => {
    const pathname = usePathname();
    return (
        <div className="w-full grid max-sm:grid-rows-3 sm:grid-cols-3 mt-2">
            {STEPS.map((step, i) => {
                const isCurrent = pathname.includes(step.url);
                const isCompleted = STEPS.slice(i + 1).some((step) => pathname.includes(step.url))
                console.log(STEPS.slice(i + 1))

                const imgUrl = `/snake-${i + 1}.png`

                return <div className={cn("w-full h-20 sm:h-24 bg-green-50 flex py-px px-2 max-sm:border-l-[4px] sm:border-b-[4px] border-gray-200 items-center gap-5", {
                    "border-green-600": isCompleted,
                    "border-gray-400": isCurrent,
                    "sm:border-l sm:border-l-gray-300": i >= 1,
                    "max-sm:border-b max-sm:border-b-gray-300": i <= 1
                })} key={i}>

                    <Image src={imgUrl} width={30} height={30} className='object-contain ml-3  shrink-0 ' alt='snake-1' />
                    <div className="flex-1 flex flex-col">
                        <p className="text-base font-bold">{step.title}</p>
                        <span className="font-normal text-sm">{step.description}</span>
                    </div>
                </div>
            })}


        </div>
    )
}

export default ProgressSteps;