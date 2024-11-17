"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { AspectRatio } from '../ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { COLORS } from '@/validators/option-validator';

const ThankYou = ({
    imageUrl,
    caseBackgroundColor
}: {
    imageUrl: string;
    caseBackgroundColor: string;
}) => {
    const [renderedDimensions, setRenderedDimensions] = useState({
        width: 0,
        height: 0
    })
    const previewRef = useRef<HTMLDivElement>(null);



    const handleResize = () => {
        if (!previewRef.current) return
        const { width, height } = previewRef.current.getBoundingClientRect()
        setRenderedDimensions({ width, height })
    }

    useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [previewRef.current])

    const case_color = COLORS.find((col) => col.value === caseBackgroundColor);

    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 md:grid-cols-7 pt-8">
                <div
                    className="col-span-1 md:col-span-5"
                >
                    <AspectRatio className='relative w-full border bg-zinc-100 rounded-md' ratio={3000 / 2001} ref={previewRef}>
                        <div
                            className='absolute z-20 scale-[1.0352]'
                            style={{
                                left:
                                    renderedDimensions.width / 2 -
                                    renderedDimensions.width / (1216 / 121),
                                top: renderedDimensions.height / 6.22,
                            }}>
                            <img
                                width={renderedDimensions.width / (3000 / 637)}
                                className={cn(
                                    'phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',

                                )}
                                src={imageUrl}
                                style={{
                                    backgroundColor: case_color!.tw
                                }}
                            />
                        </div>

                        <div className='relative h-full w-full z-40'>
                            <img
                                alt='phone'
                                src='/clearphone.png'
                                className='pointer-events-none h-full w-full antialiased rounded-md'
                            />
                        </div>
                    </AspectRatio>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;