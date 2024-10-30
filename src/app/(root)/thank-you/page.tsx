import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import ThankYou from '@/components/shared/thank-you';
import Order from '@/database/models/order';
import Case, { ICase } from '@/database/models/case';
import React from 'react'
import { notFound } from 'next/navigation';

interface searchProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ThankYouPage = async ({ searchParams }: searchProps) => {
    const { id } = searchParams;
    if (!id) return notFound()

    const order = await Order.findById(id);
    if (!order) return notFound()

    const configured_case: ICase | null = await Case.findById(order.caseId);
    if (!configured_case) return notFound()




    return (
        <div className='w-full'>
            <MaxWidthWrapper>
                <ThankYou imageUrl={configured_case.imageUrl} />
            </MaxWidthWrapper>
        </div>
    );
};

export default ThankYouPage;