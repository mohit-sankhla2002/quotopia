import Feed from '@/components/Feed';


export default function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className="head_text text-center">
        Discover & Share
        <br className=""/>  
        <span className="orange_gradient text-center">Powerful Quotes</span>
      </h1>
      <p className="desc text-center">Quotopia is an Open Source palace for the modern world to discover, create and share creative and powerful quotes</p>
      
      <Feed />
    </section>
  )
};