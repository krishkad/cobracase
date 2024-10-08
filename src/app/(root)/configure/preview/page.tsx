import Preview from '@/components/shared/preview';
import { ConnectToDatabase } from '@/database/db';
import Image from '@/database/models/image';
import React from 'react'

interface SearchProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const PreviewPage = async ({ searchParams }: SearchProps) => {

  const { id } = searchParams;
  await ConnectToDatabase();

  const image = await Image.findById(id);

  console.log({ image });
  return (
    <Preview imageUrl={image.configured_image} imageHeight={image.configured_image_height} imageWidth={image.configured_image_width} />
  )
}

export default PreviewPage