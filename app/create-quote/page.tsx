"use client"

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import toast from 'react-hot-toast';
import type Post from '@/types/Post';
import axios from 'axios';

export default function CreateQuote() {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     toast.error("You must be signed in to create a quote.");
  //     router.push("/");
  //   }
  // }, [])
  const [post, setPost] = useState<Post>({
    quote: '', 
    author: '', 
    tag: ""
  });

  const createQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post('/api/quote/new', {
        ...post, 
        userId: session?.user?.id
      });

      if (response.status === 201) {
        toast.success("Quote created successfully.");
        router.push("/");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
        type="Create"
        post={post}    
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createQuote}
    />
  )
}