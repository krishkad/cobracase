import React from 'react'
import { Progress } from '@/components/ui/progress'
import { ImagePlus, Loader } from 'lucide-react'

const DesignPage = () => {
    const isPending = false
    const isUploading = false
    const isCompconste = false
    const progress = 35
    const isEmpty = true
    return (
        <div className='w-full'>
            <div className="w-full mt-5">
                <div className="w-full md:w-3/4 h-[300px] flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 mx-auto">
                    {isEmpty ? (
                        <div className='w-fit h-fit flex flex-col items-center justify-center'>
                            <ImagePlus className='w-4 h-4 text-gray-400 hover:text-gray-900' />
                            <p className='mt-2'>
                                <span className='font-semibold'>Click to upload</span> or
                                drag and drop
                            </p>
                            <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                        </div>
                    ) : isPending || isUploading ? (
                        <div className='w-fit h-fit flex flex-col items-center justify-center'>
                            <Loader className='w-5 h-5 animate-spin text-gray-500' />
                            <p className="font-medium mt-2">Uploading...</p>
                            <Progress value={progress} className="w-40 mt-5" />
                        </div>
                    ) : isCompconste ? (
                        <div className='w-fit h-fit flex flex-col items-center justify-center'>

                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default DesignPage