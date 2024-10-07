"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import { COLORS, FINISHES, MATERIALS, MODEL } from '@/validators/option-validator';
import { Radio, RadioGroup } from '@headlessui/react';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import NextImage from "next/image";
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import HandleComponent from './handle-component';
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";



const DesignConstructor = ({
    imageUrl,
    width,
    height,
    configId
}: {
    imageUrl: string,
    width: number,
    height: number,
    configId: string
}) => {

    const [options, setOptions] = useState<{
        color: typeof COLORS[number],
        model: typeof MODEL[number],
        material: typeof MATERIALS.options[number],
        finish: typeof FINISHES.options[number],
        casePrice: number
    }>({
        color: COLORS[0],
        model: MODEL[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0],
        casePrice: 9
    });

    const caseRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [renderedDimension, SetRenderedDimension] = useState({
        width,
        height,
    });

    const [renderedPosition, setRenderedPosition] = useState({
        x: 100,
        y: 120,
    });

    const { startUpload } = useUploadThing('imageUploader', {
        onClientUploadComplete([data]) {
            const { configId } = data.serverData
            if (configId) {
                router.push(`/configure/preview?id=${configId}`)
            }
        }
    });

    async function saveConfiguration() {
        try {
            const {
                left: caseLeft,
                top: caseTop,
                width: caseWidth,
                height: caseHeight
            } = caseRef.current!?.getBoundingClientRect();
            const {
                left: containerLeft,
                top: containerTop,
            } = containerRef.current!?.getBoundingClientRect();

            const leftOffset = caseLeft - containerLeft;
            const topOffset = caseTop - containerTop;

            const actualX = renderedPosition.x - leftOffset;
            const actualY = renderedPosition.y - topOffset;

            // console.log({ leftOffset, topOffset, actualX, actualY, width: renderedDimension.width, height: renderedDimension.height })

            const canvas = document.createElement('canvas');
            canvas.width = caseWidth;
            canvas.height = caseHeight;
            const ctx = canvas.getContext('2d');

            const userImage = new Image();
            userImage.crossOrigin = 'anonymous';
            userImage.src = imageUrl
            await new Promise((resolve) => (userImage.onload = resolve))

            // console.log({ userImage });

            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height,

            )

            const base64 = canvas.toDataURL();
            const base64Data = base64.split(',')[1];

            const blob = base64ToBlob(base64Data, 'image/png');
            // console.log({ blob })
            const file = new File([blob], `filename.png`, { type: 'image/png' });
            // console.log({ file: [file] })

            await startUpload([file], { configId })
        } catch (error) {
            console.log(error);
        }
    }

    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        return new Blob([byteArray], { type: mimeType })
    }


    return (
        <div className="w-full py-8 mb-10">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-x-5 ">
                <div className="relative w-full h-[37.5rem] col-span-2 max-w-4xl border-2 border-dashed rounded-xl border-gray-400 flex items-center justify-center overflow-hidden" ref={containerRef}>
                    <div className="relative w-60 pointer-events-none bg-opacity-50 aspect-[896/1831]">
                        <AspectRatio
                            className='relative pointer-events-none z-40 aspect-[896/1831] w-full'
                            ratio={896 / 1831}
                            ref={caseRef}
                        >
                            <NextImage src="/phone-template-white-edges.png" fill sizes="width:0,height:0" priority alt="Image" className="rounded-[36px] object-cover z-40 select-none pointer-events-none" />
                        </AspectRatio>
                        <div className='absolute z-30 inset-0 top-px bottom-px left-[2px] right-[2px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                        <div className={cn('absolute inset-0 top-px bottom-px left-[2px] right-[2px] rounded-[32px]')} style={{
                            backgroundColor: options.color.tw
                        }} />
                    </div>
                    <Rnd
                        default={{
                            x: 100,
                            y: 120,
                            width: width / 4,
                            height: height / 4,
                        }}
                        lockAspectRatio
                        className='absolute z-20 border-[3px] rounded-xl border-primary'
                        resizeHandleComponent={{
                            topLeft: <HandleComponent />,
                            topRight: <HandleComponent />,
                            bottomLeft: <HandleComponent />,
                            bottomRight: <HandleComponent />,
                        }}
                        onResizeStop={(_, __, ref, ____, { x, y }) => {
                            SetRenderedDimension({
                                height: parseInt(ref.style.height.slice(0, - 2)),
                                width: parseInt(ref.style.width.slice(0, - 2))
                            })
                            setRenderedPosition({ x, y })
                        }}
                        onDragStop={(_, data) => {
                            const { x, y } = data;
                            setRenderedPosition({ x, y });
                        }}
                    >
                        <div className="relative w-full h-full">
                            <NextImage src={imageUrl} unoptimized fill priority className='pointer-events-none' alt='image' />
                        </div>
                    </Rnd>
                </div>
                <div className="w-full h-fit lg:h-[calc(37.5rem-48px)] col-span-full lg:col-span-1">
                    <ScrollArea className="relative w-full h-full overflow-auto mt-12">

                        {/* <div className="w-full  mb-3 border border-gray-200" /> */}
                        <h1 className="text-3xl tracking-tight font-bold">
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
                            <Label className='block'>
                                Model
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='outline'
                                        role='combobox'
                                        className='w-full justify-between mt-4'
                                    >
                                        {options.model.label}
                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {MODEL.map((model) => (
                                        <DropdownMenuItem
                                            key={model.label}
                                            className={cn(
                                                'w-full flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                                                {
                                                    'bg-zinc-100':
                                                        model.label === options.model.label,
                                                }
                                            )}
                                            onClick={() => {
                                                setOptions((prev) => ({
                                                    ...prev,
                                                    model
                                                }))
                                            }}>
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    model.label === options.model.label
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {model.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-full mt-8">
                            <div className="w-full flex flex-col gap-8">
                                {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => {
                                    return <RadioGroup
                                        key={name}
                                        value={options[name]}
                                        onChange={(val) => {
                                            setOptions((prev) => ({
                                                ...prev, [name]: val
                                            }))
                                        }}
                                    >
                                        <Label>
                                            {name.slice(0, 1).toUpperCase()}{name.slice(1)}
                                        </Label>
                                        <div className="w-full mt-4 flex flex-col gap-4">
                                            {selectableOptions.map((options, i) => {
                                                return <Radio
                                                    key={i}
                                                    value={options}
                                                    className={(bag) => cn("w-full p-4 border-2 border-gray-300 rounded-xl cursor-pointer", {
                                                        ["border-green-600"]: bag.checked || bag.focus
                                                    })}
                                                >
                                                    <div className="w-full flex items-center justify-between">
                                                        <p className="font-medium">{options.label}</p>
                                                        <p className="font-medium">${options.price}</p>
                                                    </div>
                                                    {options.description && <div className="w-full mt-3">
                                                        <p className="text-gray-600 text-xs">
                                                            {options.description}
                                                        </p>
                                                    </div>}
                                                </Radio>
                                            })}
                                        </div>
                                    </RadioGroup>
                                })}
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            <div className="w-full flex justify-between items-center gap-5">
                                <p className="text-lg font-bold">${options.casePrice + options.finish.price + options.material.price}</p>
                                <Button className='flex-1' variant={"default"} onClick={() => {
                                    saveConfiguration()
                                }}>
                                    Continue
                                    <ArrowRight
                                        className='w-4 h-4 shrink-0 ml-1.5 text-white inine'
                                    />
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div >
    )
}

export default DesignConstructor