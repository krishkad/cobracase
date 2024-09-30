import Image from 'next/image';
import React from 'react'

const ProgressSteps = () => {
    return (
        <div className="w-full grid max-sm:grid-rows-3 sm:grid-cols-3 mt-2">
            <div className="w-full h-20 sm:h-24 bg-green-50 flex py-px px-2 border-l-[4px] sm:border-b-[4px] border-b sm:border-l border-green-600 items-center gap-5">
                <Image src={'/snake-1.png'} width={30} height={30} className='object-contain ml-3  shrink-0 ' alt='snake-1' />
                <div className="flex-1 flex flex-col">
                    <p className="text-base font-bold">Step - 1</p>
                    <span className="font-normal text-sm">Upload image</span>
                </div>
            </div>
            <div className="w-full h-20 sm:h-24 bg-green-50 flex py-px px-2 border-l-[4px] sm:border-b-[4px] border-b sm:border-l border-green-600/30 items-center gap-5">
                <Image src={'/snake-2.png'} width={30} height={30} className='object-contain ml-3  shrink-0 ' alt='snake-1' />
                <div className="flex-1 flex flex-col">
                    <p className="text-base font-bold">Step - 2</p>
                    <span className="font-normal text-sm">Design Your case</span>
                </div>
            </div>
            <div className="w-full h-20 sm:h-24 bg-green-50 flex py-px px-2 border-l-[4px] sm:border-b-[4px] border-gray-300  items-center gap-5">
                <Image src={'/snake-3.png'} width={30} height={30} className='object-contain ml-3  shrink-0 ' alt='snake-1' />
                <div className="flex-1 flex flex-col">
                    <p className="text-base font-bold">Step - 3</p>
                    <span className="font-normal text-sm">Preview case</span>
                </div>
            </div>
        </div>
    )
}

export default ProgressSteps;