"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const ProfileCard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
      <div className='glassmorphism max-w-2xl flex justify-between items-center gap-2'>
        {/* Profile Picture */}
        <div>
          <Image src={session?.user?.image} alt='Image' width={50} height={50} className='rounded-full border' />
        </div>

        <div className='flex flex-col'>
          <div className='text-gray-950 font-semibold'>{session?.user?.name ? session?.user?.name : "Testing"}</div>
          <div className='text-sm text-gray-500 font-medium'>{session?.user?.email ? session?.user?.email : "testing@testing.com"}</div>
        </div>
      </div>
  )
}

export default ProfileCard;