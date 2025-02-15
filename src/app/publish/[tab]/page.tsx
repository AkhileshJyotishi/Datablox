"use client"
import Metadata from '@/components/publish-page/Metadata';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
  const { tab } = useParams(); // Use `tab` from the URL
  if(tab=="1") return <Metadata/>
  return <></>
}
