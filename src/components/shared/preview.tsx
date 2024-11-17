"use client"
import React, { useEffect, useState } from 'react'
import Phone from './phone';
import Confetti from 'react-dom-confetti';
import { cn } from '@/lib/utils';
import { COLORS, FINISHES, MATERIALS, MODEL } from '@/validators/option-validator';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { processOrder } from '@/actions/process-order';
import { useRouter } from 'next/navigation';
import DotLoading from './loading';
import { useToast } from '@/hooks/use-toast';
import AuthDialog from './auth-dialog';
import { useSession } from 'next-auth/react';

const Preview = ({
    imageUrl,
    finish,
    material,
    model,
    color,
    casePrice,
    configId
}: {
    imageUrl: string,
    finish: string,
    material: string,
    model: string,
    color: string,
    casePrice: number
    configId: string
}) => {

    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [authDialog, setAuthDialog] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();

    useEffect(() => {
        window.scrollTo(0, 0)
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
        }, 3000);
    }, []);



    const { mutate } = useMutation({
        mutationKey: ['get-paymant-session'],
        mutationFn: processOrder,
        onSuccess: ({ url }) => {
            if (url) {
                setProcessing(false);
                router.push(url);
            } else {
                setProcessing(false);
                toast({
                    title: "Something went wrong. Try again",
                    variant: "destructive"
                });
            };
        },
        onError(error, variables, context) {
            setProcessing(false);
            toast({
                title: "Something went wrong. Try again",
                description: error.message,
                variant: "destructive"
            });
        },
    });


    const handleCheckOut = () => {
        if (session) {
            setProcessing(true);
            mutate({ configId });
        } else {
            setAuthDialog(true);
        }
    };



    const config = {
        angle: 180,
        spread: 360,
        startVelocity: 30,
        elementCount: 400,
        dragFriction: 0.12,
        duration: 4000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "1000px",
        colors: ["#c1d426", "#f61212", "#1954f2", "#80dd13", "#dd7e08"]
    };

    const modelName = MODEL.find((mod) => model === mod.value);
    const materialInfo = MATERIALS.options.find((mat) => material === mat.value);
    const finishInfo = FINISHES.options.find((fin) => finish === fin.value);
    const totalPrice = casePrice + materialInfo!?.price + finishInfo!?.price;
    const twColor = COLORS.find((colo) => colo.value === color)

    return (
        <>
            <div className={cn("pointer-none select-none absolute inset-0 overflow-hidden flex justify-center z-[45]", !showConfetti && 'hidden')}>
                <Confetti
                    active={showConfetti}
                    config={config}
                />
            </div>
            <div className="w-full my-8">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-5">
                    <div className="w-full row-span-2 flex items-center justify-center">
                        <Phone SrcImg={imageUrl} style={{ backgroundColor: twColor!.tw }} />
                    </div>
                    <div className="w-full row-span-2 col-span-2 mt-5 md:mt-0">
                        <h1 className="text-3xl font-bold text-balance">
                            Your
                            {" "}
                            <span className="px-1.5 bg-primary text-white">
                                {modelName?.label}
                            </span>
                            {" "}
                            Case
                        </h1>
                        <div className='mt-3 flex items-center gap-1.5 text-base'>
                            <Check
                                className='h-4 w-4 text-green-500'
                            />
                            In stock and ready to ship
                        </div>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 sm:mt-8 border border-green-300 bg-green-50 rounded-lg p-2">

                            <div>
                                <p className='font-medium text-zinc-950'>Highlights</p>
                                <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                    <li>Wireless charging compatible</li>
                                    <li>TPU shock absorption</li>
                                    <li>Packaging made from recycled materials</li>
                                    <li>5 year print warranty</li>
                                </ol>
                            </div>
                            <div>
                                <p className='font-medium text-zinc-950'>Materials</p>
                                <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                    <li>High-quality, durable material</li>
                                    <li>Scratch- and fingerprint resistant coating</li>
                                </ol>
                            </div>
                        </div>
                        <div className="w-full mt-12 sm:mt-8">
                            <div className="w-full flex items-center justify-between mt-2">
                                <p className="font-medium text-gray-500">
                                    {modelName?.label} Case
                                </p>
                                <p className="font-medium">
                                    ${casePrice}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between mt-2">
                                <p className="font-medium text-gray-500">
                                    {materialInfo?.label}
                                </p>
                                <p className="font-medium">
                                    ${materialInfo?.price}
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between my-2">
                                <p className="font-medium text-gray-500">
                                    {finishInfo?.label}
                                </p>
                                <p className="font-medium">
                                    ${finishInfo?.price}
                                </p>
                            </div>
                            <hr />
                            <div className="w-full flex items-center justify-between mt-2">
                                <p className="font-bold text-black">
                                    Total Price
                                </p>
                                <p className="font-bold">
                                    ${totalPrice}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end mt-16">
                            <Button
                                onClick={handleCheckOut}
                                isLoading={processing}
                                disabled={processing}
                                loadingChildren={
                                    <>
                                        <span className="relative flex items-center justify-center gap-2">
                                            <DotLoading width={70} height={70} className="" />
                                        </span>
                                    </>
                                }
                            >
                                Check out
                                <ArrowRight
                                    className='w-4 h-4 text-white inline ml-1.5'
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <AuthDialog authDialog={authDialog} setAuthDialog={setAuthDialog} id={configId} />
        </>
    )
}

export default Preview;