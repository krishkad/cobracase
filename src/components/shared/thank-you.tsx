"use client";
import Image from 'next/image';
import React from 'react'

const ThankYou = ({
    imageUrl,
}: {
    imageUrl: string
}) => {
    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 md:grid-cols-7">
                <div className="col-span-1 md:col-span-5">
                    <div className="relative w-full h-[550px]">
                        <Image
                            src={'/clearphone.png'}
                            width={0}
                            height={0}
                            className='w-full h-full object-cover'
                            unoptimized
                            alt=''
                        />
                        {/* <div className="absolute inset-0 w-64">

                            <Image
                                src={configured_case.configured_image!}
                                width={configured_case.configured_image_width}
                                height={configured_case.configured_image_height}
                                className=''
                                unoptimized
                                alt=''
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;