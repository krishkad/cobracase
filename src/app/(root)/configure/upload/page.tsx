"use client"
import React, { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { ImagePlus, Loader2, MousePointerSquareDashed } from 'lucide-react'
import Dropzone from 'react-dropzone'
import { cn } from '@/lib/utils'

const DesignPage = () => {
    const isPending = false
    const isUploading = false
    const isCompconste = false
    const progress = 35
    const [onDrag, setOnDrag] = useState<boolean>(false);

    const handleDropAccept = () => { }
    const handleDropReject = () => { }
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
                                        <Progress value={progress} className="w-40" />
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