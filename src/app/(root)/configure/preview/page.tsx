import Preview from '@/components/shared/preview';
import { ConnectToDatabase } from '@/database/db';
import Case from '@/database/models/case';
import { notFound } from 'next/navigation';
import React from 'react'

interface SearchProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const PreviewPage = async ({ searchParams }: SearchProps) => {

  const { id } = searchParams;
  if (!id || typeof id === undefined) return notFound();
  await ConnectToDatabase();

  const image = await Case.findById(id);

  if (!image.configured_image) return notFound();

  const configId = image._id!?.toString();

  return (
    <Preview imageUrl={image.configured_image} model={image.model} finish={image.finish} material={image.material} color={image.color} casePrice={image.casePrice} configId={configId} />
  )
}

export default PreviewPage