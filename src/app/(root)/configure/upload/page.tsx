"use client"
import React, { useState, useTransition } from 'react';
import { Progress } from '@/components/ui/progress';
import { ImagePlus, Loader2, MousePointerSquareDashed } from 'lucide-react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const DesignPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const isCompconste = false;
    const [progress, setProgress] = useState<number>(0);
    const [onDrag, setOnDrag] = useState<boolean>(false);

    const { startUpload, isUploading } = useUploadThing('imageUploader', {
        onClientUploadComplete([data]) {
            if (!data.serverData?.configId) return;
            const configId = data?.serverData?.configId;
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`);
            });
        },
        onUploadProgress(p) {
            setProgress(p);
        },
        onUploadError(e) {
            toast({
                title: "something went wrong. Try again",
            })
        },
    });

    const handleDropAccept = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined });
        setOnDrag(false);
    };

    const handleDropReject = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles;
        toast({
            title: `${file.file.type} is not accpeted`,
            description: "Please try uploading PNG, JPG, JPEG instead.",
            variant: 'destructive'
        });
        setOnDrag(false);
    };

    return (
        <div className='w-full'>
            <div className="w-full py-8">
                <div className={cn("w-full h-[500px] flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 mx-auto", {
                    "bg-slate-100": onDrag
                })}>
                    <Dropzone
                        onDragEnter={() => setOnDrag(true)}
                        onDragLeave={() => setOnDrag(false)}
                        accept={{
                            'image/jpg': ['.jpg'],
                            'image/png': ['.png'],
                            'image/jpeg': ['.jpeg'],
                        }}
                        onDropAccepted={handleDropAccept}
                        onDropRejected={handleDropReject}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div className="w-full h-full flex flex-col items-center justify-center" {...getRootProps()}>
                                <input  {...getInputProps()} />
                                {onDrag ? (
                                    <div className='w-fit h-fit flex flex-col items-center justify-center gap-2'>
                                        <MousePointerSquareDashed className='w-6 h-6 text-gray-400' />
                                        <p className=''>
                                            <span className='font-semibold'>Drop</span> file here
                                        </p>
                                        <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                                    </div>
                                ) : isPending || isUploading ? (
                                    <div className='w-fit h-fit flex flex-col items-center justify-center gap-2'>
                                        <Loader2 className='w-6 h-6 animate-spin text-green-600' />
                                        <p className="font-medium">Uploading...</p>
                                        <div className="w-fit flex flex-col items-end">
                                            <p className="text-xs font-medium text-gray-400">{progress}%</p>
                                            <Progress value={progress} className="w-40" />
                                        </div>
                                        {isPending && <p className="font-medium text-gray-400">Redirecting please wait...</p>}
                                    </div>
                                ) : isCompconste ? (
                                    <div className='w-fit h-fit flex flex-col items-center justify-center gap-2'>

                                    </div>
                                ) : <div className='w-fit h-fit flex flex-col items-center justify-center gap-2'>
                                    <ImagePlus className='w-6 h-6 text-gray-400' />
                                    <p className=''>
                                        <span className='font-semibold'>Click to upload</span> or
                                        drag and drop
                                    </p>
                                    <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                                </div>}
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
        </div>
    )
}

export default DesignPage