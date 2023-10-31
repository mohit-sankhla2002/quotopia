"use client"

import React, { useState, useEffect } from 'react';
import Form from '@/components/Form'
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function EditPage() {
  const { quoteId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getQuote = async () => {
      const resp = await axios.get(`/api/quote/${quoteId}`);
      console.log(resp.data);
      setPostData(resp.data);
      setLoading(false);
    }

    getQuote();
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);
    await axios.patch(`/api/quote/${quoteId}`, postData);
    setSubmitting(false);
    router.push("/profile");
  }

  if (loading == true) return <Loading />;

  return (
    <section className='w-full'>
      <Form type='Update' post={postData} submitting={submitting} handleSubmit={handleSubmit} setPost={setPostData} />
    </section>
  )
};