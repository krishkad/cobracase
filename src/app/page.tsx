import React from "react";
import Hero from "@/components/shared/hero";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import Icons from "@/components/shared/icons";
import Reviews from "@/components/shared/reviews";

export default function Home() {
  return (
    <div className="size-full">
      <Hero />
      <div className="w-full bg-slate-100">
        <MaxWidthWrapper className="py-12 sm:py-20 flex flex-col  gap-16 sm:gap-32">
          <div className="mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-balance tracking-tight !leading-tight text-gray-900">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="absolute -bottom-6 inset-x-0 text-green-600" />
              </span>
              say
            </h2>
          </div>
          <div className='mx-auto max-w-2xl lg:max-w-none grid grid-cols-1 lg:grid-cols-2 items-start gap-10 px-4 lg:px-0'>
            <div className="flex flex-col items-start justify-between gap-8 max-lg:border-b-2 pb-8">
              <div className="flex gap-0.5">
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
              </div>
              <p className="text-lg font-normal ">&ldquo;I recently ordered a custom photo printed case for my iPhone, and I really happy with how it turned out! The process of uploading my picture was super easy, and the final product came out exactly as I hoped. The print is clear, vibrant, and fits perfectly on the case without any awkward cropping or blurring. The case itself feels sturdy and protective, while still showcasing my personal photo beautifully. Overall, its a great way to personalize my phone, and I definitely recommend it to anyone looking to add a special touch to their device!&quot;</p>
              <div className="flex items-center gap-3">
                <Image src={'/users/user-1.png'} width={40} height={40} className="rounded-full object-cover shrink-0" alt="user" />
                <div className="">
                  <p className="font-semibold">Chris T</p>
                  <p className="flex gap-1 items-center">
                    <Check className="w-4 h-4 stroke-2 text-green-600 shrink-0" />
                    <span className="font-semibold text-gray-500 text-sm">Verified Purchase</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 max-lg:border-b-2 pb-8">
              <div className="flex gap-0.5">
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
              </div>
              <p className="text-lg font-normal">&quot;I recently bought a custom phone case with a photo printed on it, and I&apos;m really happy with how it turned out! The ordering process was simple, and uploading my image was quick and straightforward. The print quality is fantastic—vivid, sharp, and exactly as I had hoped. The case itself is sturdy and offers great protection for my phone, while still showing off my personal photo beautifully. It fits perfectly without any distortion or cropping of the image. Overall, it&apos;s a perfect way to add a personal touch to my phone, and I would highly recommend it to others!&quot;</p>
              <div className="flex items-center gap-3">
                <Image src={'/users/user-4.jpg'} width={40} height={40} className="rounded-full object-cover shrink-0" alt="user" />
                <div className="">
                  <p className="font-semibold">Sarah W</p>
                  <p className="flex gap-1 items-center">
                    <Check className="w-4 h-4 stroke-2 text-green-600 shrink-0" />
                    <span className="font-semibold text-gray-500 text-sm">Verified Purchase</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <div className="w-full bg-slate-50">
        <MaxWidthWrapper className="py-12 sm:py-20">
          <Reviews />
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
