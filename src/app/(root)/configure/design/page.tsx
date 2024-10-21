import React from 'react';
import DesignConstructor from '@/components/shared/design-constructor';
import { ConnectToDatabase } from '@/database/db';
import Case from '@/database/models/case';

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}


const Designpage = async ({ searchParams }: PageProps) => {

    const { id } = searchParams;

    await ConnectToDatabase();

    const { imageUrl, width, height, _id } = await Case.findById(id);
    const configId = _id.toString();
    
    return (
        <DesignConstructor imageUrl={imageUrl} width={width} height={height} configId={configId} />
    );
};

export default Designpage;