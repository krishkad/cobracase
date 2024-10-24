import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import React from 'react'

interface searchProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ThankYour = ({ searchParams }: searchProps) => {
    const { id } = searchParams
    return (
        <div className='w-full'>
            <MaxWidthWrapper>
                ThankYour
            </MaxWidthWrapper>
        </div>
    )
}

export default ThankYour