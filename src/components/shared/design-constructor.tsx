"use client"
import React, { useEffect, useState } from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Rnd } from 'react-rnd'
import { COLORS, FINISHES, MATERIALS, MODEL } from '@/validators/option-validator';
import { Radio, RadioGroup } from '@headlessui/react'
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { DashIcon } from '@radix-ui/react-icons';




const DesignConstructor = ({
    imageUrl,
    width,
    height
}: {
    imageUrl: string,
    width: number,
    height: number
}) => {

    const [options, setOptions] = useState<{
        color: typeof COLORS[number],
        model: typeof MODEL[number],
        material: typeof MATERIALS[number],
        finishes: typeof FINISHES[number],
    }>({
        color: COLORS[0],
        model: MODEL[0],
        material: MATERIALS[0],
        finishes: FINISHES[0]
    });


    return (
        <div className="w-full py-8 mb-40">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="relative w-full h-[37.5rem] col-span-2 max-w-4xl border-2 border-dashed rounded-xl border-gray-400 flex items-center justify-center overflow-hidden">
                    <div className="relative w-60 pointer-events-none bg-opacity-50 aspect-[896/1831]">
                        <AspectRatio
                            className='relative pointer-events-none z-40 aspect-[896/1831] w-full'
                            ratio={896 / 1831}
                        >
                            <Image src="/phone-template-white-edges.png" fill alt="Image" className="rounded-[36px] object-cover z-40 select-none pointer-events-none" />
                        </AspectRatio>
                        <div className='absolute z-30 inset-0 top-px bottom-px left-[2px] right-[2px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                        <div className={cn('absolute inset-0 top-px bottom-px left-[2px] right-[2px] rounded-[32px]')} style={{
                            backgroundColor: options.color.tw
                        }} />
                    </div>
                    <Rnd
                        default={{
                            x: 250,
                            y: 150,
                            width: width / 4,
                            height: height / 4,
                        }}
                        lockAspectRatio
                        className='border-[3px] border-foreground'
                    >
                        <div className="relative w-full h-full">
                            <Image src={imageUrl} unoptimized fill className='pointer-events-none' alt='image' />
                        </div>
                    </Rnd>
                </div>
                <div className="w-full">
                    {/* <div className="w-full  mb-3 border border-gray-200" /> */}
                    <h1 className="text-3xl tracking-tight font-bold mt-12">
                        Personalize Your Perfect Phone
                    </h1>

                    <div className="w-full mt-8">
                        <div className="flex gap-2 items-center justify-center w-fit">
                            <RadioGroup
                                value={options.color}
                                onChange={(val) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        color: val
                                    }))
                                }}
                            >
                                <Label>Color: {options.color.label}</Label>
                                <div className="flex justify-center items-center gap-3 5 mt-4">
                                    {COLORS.map((color) => {
                                        return <Radio
                                            key={color.value}
                                            value={color}
                                            className={(bag) => cn("relative -m-0.5 flex cursor-pointer justify-center items-center rounded-full active:ring-0 focus:ring-0 active:ring-offset-0 focus:ring-offset-0 p-0.5 border border-transparent", {
                                                [` border-gray-500`]: bag.checked || bag.focus
                                            })}
                                        >
                                            <span className={cn("w-8 h-8 rounded-full border")} style={{
                                                backgroundColor: color.tw
                                            }} />
                                        </Radio>
                                    })}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="w-full mt-8">
                        <Label className='block'>Model</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-60 mt-4 active:ring-none focus:ring-none active:ring-offset-0 focus:ring-offset-0' asChild>
                                <Button variant={'outline'} className='w-60 flex justify-start active:ring-none focus:ring-none active:ring-offset-0 focus:ring-offset-0'>
                                    {options.model.label}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-60'>
                                <div className="w-full">

                                    {MODEL.map((model) => {
                                        return <DropdownMenuItem
                                            key={model.value}
                                            onClick={() => {
                                                setOptions((prev) => ({
                                                    ...prev,
                                                    model
                                                }))
                                            }}
                                            className='w-full cursor-pointer '
                                        >
                                            {model.label}
                                        </DropdownMenuItem>
                                    })}
                                </div>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="w-full mt-8">
                        <Label className='block'>Material</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-60 mt-4 active:ring-none focus:ring-none active:ring-offset-0 focus:ring-offset-0' asChild>
                                <Button variant={'outline'} className=' w-60 flex justify-start active:ring-none focus:ring-none active:ring-offset-0 focus:ring-offset-0'>
                                    {options.material.label}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-60'>
                                <div className="w-full">

                                    {MATERIALS.map((material) => {
                                        return <DropdownMenuItem
                                            key={material.value}
                                            onClick={() => {
                                                setOptions((prev) => ({
                                                    ...prev,
                                                    material
                                                }))
                                            }}
                                            className=' w-full cursor-pointer flex justify-between items-center'
                                        >
                                            <span>
                                                {material.label}
                                            </span>
                                            <span className='flex items-center justify-center gap-1'>
                                                <DashIcon className='w-3 h-3' />
                                                {material.price}
                                            </span>
                                        </DropdownMenuItem>
                                    })}
                                </div>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="w-full mt-8">
                        <Label className='block'>Finish</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-60 mt-4 active:ring-none focus:ring-none active:ring-offset-0 focus:ring-offset-0' asChild>
                                <Button variant={'outline'} className='w-60 flex justify-start active:ring-none focus:ring-none active:ring-offset-0 focus:ring-offset-0'>
                                    {options.finishes.label}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-60'>
                                <div className="w-full">

                                    {FINISHES.map((finishes) => {
                                        return <DropdownMenuItem
                                            key={finishes.value}
                                            onClick={() => {
                                                setOptions((prev) => ({
                                                    ...prev,
                                                    finishes
                                                }))
                                            }}
                                            className='w-full cursor-pointer flex justify-between items-center'
                                        >
                                            <span>
                                                {finishes.label}
                                            </span>
                                            <span className='flex items-center justify-center gap-1'>
                                                <DashIcon className='w-3 h-3' />
                                                {finishes.price}
                                            </span>
                                        </DropdownMenuItem>
                                    })}
                                </div>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DesignConstructor