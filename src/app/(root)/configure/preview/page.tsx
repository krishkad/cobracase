import Preview from '@/components/shared/preview';
import { ConnectToDatabase } from '@/database/db';
import Case from '@/database/models/case';
import React from 'react'

interface SearchProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const PreviewPage = async ({ searchParams }: SearchProps) => {

  const { id } = searchParams;
  await ConnectToDatabase();

  const image = await Case.findById(id);

  if (!image.configured_image) return null

  const configId = image._id!?.toString();

  return (
    <Preview imageUrl={image.configured_image} model={image.model} finish={image.finish} material={image.material} color={image.color} casePrice={image.casePrice} configId={configId} />
  )
}

export default PreviewPage