"use client"

import {useEffect, useState} from 'react'
import ProfileCard from '@/components/ProfileCard'
import axios from 'axios'
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data : session } = useSession();
  const [data, setData] = useState([]);
  useEffect(() => {
    const setQuotes = async () => {
      try {
        const response = await axios.get(`/api/quote/${session?.user?.id}`);
        console.log(response);
        if (response.status === 200) {
          setData(response.data);
        } 
      } catch (error : any) {
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
      <ProfileCard />
  )
};