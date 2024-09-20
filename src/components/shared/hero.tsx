import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'
import { Check, Star } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
    return (
        <div className='w-full bg-green-50'>
            <MaxWidthWrapper className="w-full lg:grid lg:grid-cols-3 py-12 lg:py-20 xl:py-24">
                <section className="col-span-2 max-lg:pb-4">
                    <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                        <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                            Your Image on a{' '}
                            <span className='px-2 bg-green-600 text-white'>
                                Custom
                            </span>{" "}
                            Phone Case
                        </h1>
                        <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap font-normal">
                            Capture your favorate memories with your own, {" "}
                            <span className="font-semibold">one-of-one</span> phone case.
                            CobraCase allows you to protect your memories, not just your  phone.
                        </p>

                        <ul className='mt-8 text-left space-y-2 font-medium flex flex-col items-center sm:items-start'>
                            <div className="space-y-2">
                                <li className='flex gap-1.5 items-center text-left'>
                                    <Check className='w-5 h-5 shrink-0 text-green-600' />
                                    High-quality, durable material
                                </li>
                                <li className='flex gap-1.5 items-center text-left'>
                                    <Check className='w-5 h-5 shrink-0 text-green-600' />
                                    5 year print gautantee
                                </li>
                                <li className='flex gap-1.5 items-center text-left'>
                                    <Check className='w-5 h-5 shrink-0 text-green-600' />
                                    Modern iPhone models supported
                                </li>
                            </div>
                        </ul>

                        <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                            <div className="flex -space-x-4">
                                <Image
                                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                                    width={40}
                                    height={40}
                                    src='/users/user-1.png'
                                    alt='user image'
                                />
                                <Image
                                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                                    width={40}
                                    height={40}
                                    src='/users/user-2.png'
                                    alt='user image'
                                />
                                <Image
                                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                                    width={40}
                                    height={40}
                                    src='/users/user-3.png'
                                    alt='user image'
                                />
                                <Image
                                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                                    width={40}
                                    height={40}
                                    src='/users/user-4.jpg'
                                    alt='user image'
                                />
                                <Image
                                    className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100'
                                    width={40}
                                    height={40}
                                    src='/users/user-5.jpg'
                                    alt='user image'
                                />
                            </div>

                            <div className="flex flex-col justify-between items-center sm:items-start">
                                <div className="flex gap-0.5">
                                    <Star className='w-4 h-4 shrink-0 text-green-600 fill-green-600' />
                                    <Star className='w-4 h-4 shrink-0 text-green-600 fill-green-600' />
                                    <Star className='w-4 h-4 shrink-0 text-green-600 fill-green-600' />
                                    <Star className='w-4 h-4 shrink-0 text-green-600 fill-green-600' />
                                    <Star className='w-4 h-4 shrink-0 text-green-600 fill-green-600' />
                                </div>
                                <p>
                                    <span className='font-semibold'>1.250</span> happy customers
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="col-span-full lg:col-span-1 w-full bg-green-300">ok</section>
            </MaxWidthWrapper>
        </div>
    )
}

export default Hero