import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import React from 'react'

interface searchProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ThankYouPage = ({ searchParams }: searchProps) => {
    const { id } = searchParams
    return (
        <div className='w-full'>
            <MaxWidthWrapper>
                ThankYou for Ordering
                Your orderId: {id}
            </MaxWidthWrapper>
        </div>
    )
}

export default ThankYouPage