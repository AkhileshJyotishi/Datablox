import Dataset from '@/components/dataset-page/dataset';
import Metadata from '@/components/dataset-page/metadata';
import Image from 'next/image';
import React from 'react';
import logo from "@/assets/dataset-page/img1.svg";
import RelatedDataset from '@/components/dataset-page/relatedDataset';
import NoDataFound from './noDataFound';
import CompleteMetaData from '@/components/dataset-page/CompleteMetaData';

export default async function Page({ params }: { params: { datasetId: string } }) {
  const datasetId = params.datasetId;

  let metadata = null;

  try {
    const response = await fetch(`http://localhost:3000/api/getmetadata?metadataid=${datasetId}`);

    if (!response.ok) {
      console.error("Error fetching metadata:", response.statusText);
      return <NoDataFound />
    } else {
      const data = await response.json();
      if (!data.error) {
        metadata = data;
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return (
    <CompleteMetaData metadata={metadata} />
  );
}
