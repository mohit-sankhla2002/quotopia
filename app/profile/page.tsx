"use client"

import { useEffect, useState } from 'react';
import ProfileCard from '@/components/ProfileCard'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import QuoteCard from '@/components/QuoteCard';

export default function Profile() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  useEffect(() => {
    const setQuotes = async () => {
      try {
        const response = await axios.get(`/api/quote/${session?.user?.id}`); // how to get rid of this red squiggly?
        console.log(response);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          setData([]);
        }
      }
    }
    if (session && session.user) {
      setQuotes();
    }
  }, [session]);
  console.log(data);
  return (
    <section className='w-full max-w-full flex flex-col flex-start'>
      <ProfileCard />
      <div className='flex gap-4 mt-10 flex-wrap items-start'>
      {data.map((quote) => (<QuoteCard post={quote} handleTagClick={() => {}} handleDelete={() => {}} handleEdit={() => {}}/>))}
      </div>
    </section>
  )
};