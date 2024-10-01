import React from 'react';
import DesignConstructor from '@/components/shared/design-constructor';
import Image from '@/database/models/image';
import { ConnectToDatabase } from '@/database/db';

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}


const Designpage = async ({ searchParams }: PageProps) => {

    const { id } = searchParams;

    await ConnectToDatabase();

    const { imageUrl, width, height } = await Image.findById(id);
    return (
        <DesignConstructor imageUrl={imageUrl} width={width} height={height} />
    );
};

export default Designpage;