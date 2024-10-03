"use client"
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Upload, Scaling, ScanEye, CircleCheck, Check, BadgeCheck } from 'lucide-react';


const STEPS = [
    {
        title: "Upload Image",
        url: "/upload",
        icon: <Upload className='w-3 h-3' />,
        description: "Choose and upload your preferred image."
    },
    {
        title: "Design your case",
        url: "/design",
        icon: <Scaling className='w-3 h-3' />,
        description: "Customize your case with creative designs."
    },
    {
        title: "Preview case",
        url: "/preview",
        description: "View the final design before purchase."
    }
];

const ProgressSteps = () => {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const [lineWidth, setlineWidth] = useState(0);


    useEffect(() => {
        // Set the initial width on the first render
        getWidth();

        // Add window resize event listener to track width changes after resizing
        window.addEventListener('resize', getWidth);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', getWidth);
        };
    }, []);



    function getWidth() {
        const { width } = containerRef.current!?.getBoundingClientRect()
        const linewidth = width / 2 - 60;
        setlineWidth(linewidth)
    }

    return (
        <div className="w-full flex items-center justify-between mt-2 overflow-hidden" ref={containerRef}>
            {STEPS.map((step, i) => {
                const isCurrent = pathname.includes(step.url);
                const isCompleted = STEPS.slice(i + 1).some((step) => pathname.includes(step.url))

                const imgUrl = `/snake-${i + 1}.png`

                return <div key={i} className="w-fit justify-self-start flex flex-col items-center justify-center  gap-4">
                    {
                        step.url === '/upload' ?
                            <Upload className={cn('w-5 h-5 text-gray-400', {
                                'text-primary': isCompleted,
                                'text-[#A0D683]': isCurrent
                            })} />
                            :
                            step.url === '/design' ?
                                <Scaling className={cn('w-5 h-5 text-gray-400', {
                                    'text-primary': isCompleted,
                                    'text-[#A0D683]': isCurrent
                                })} />
                                :
                                step.url === '/preview' ?
                                    <ScanEye className={cn('w-5 h-5 text-gray-400', {
                                        'text-primary': isCompleted,
                                        'text-[#A0D683]': isCurrent
                                    })} />
                                    :
                                    null

                    }
                    <div className="relative">
                        <div className={cn("w-fit h-fit p-1 rounded-full bg-gray-300", {
                            "bg-primary": isCompleted,
                            'bg-[#A0D683]': isCurrent

                        })}>
                            {isCompleted ? <Check className='w-3 h-3 text-white stroke-2 stroke-white' />
                                :
                                <p className={cn("w-3 h-3 flex items-center justify-center font-bold text-white", {
                                    "text-white": isCurrent
                                })}>
                                    <span className='text-xs'>{i + 1}</span>
                                </p>}
                        </div>
                        {i !== 2 &&
                            <div
                                className={cn("absolute top-[calc(50%-2px)] left-[93%] h-1 bg-[#A0D683]", {
                                    'bg-[#A0D683]': isCurrent,
                                    "bg-green-500": isCompleted
                                })}
                                style={{ width: lineWidth }}
                            />}
                    </div>
                    <p className={cn("font-semibold text-gray-400 text-sm sm:text-base", {
                        "text-primary": isCompleted,
                        "text-[#A0D683]": isCurrent
                    })}>{step.title}</p>
                </div>
            })}


        </div>
    )
}

export default ProgressSteps;