import Feed from '@/components/Feed';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

export default function Home() {
  return (
    <section className='w-[100vw] flex-center flex-col'>
      <h1 className="head_text text-center">
        Discover & Share
        <br className=""/>  
        <span className="orange_gradient text-center">Powerful Quotes</span>
      </h1>
      <p className="desc text-center">Quotopia is an Open Source palace for the modern world to discover, create and share creative and powerful quotes</p>
      <Suspense fallback={<Loading />}>
        <Feed />
      </Suspense>
    </section>
  )
};