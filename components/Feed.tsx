"use client"

import React, { useState, useEffect } from 'react'
import QuoteCard from './QuoteCard';
import axios from 'axios';

type Props = {
  data : [any] | [] // FIXME: type
  handleTagClick: (tag: string) => void;
}

const QuoteCardList = ({ data, handleTagClick } : Props) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: any) => (
        <QuoteCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    // fetch quotes from the server
    const fetchPosts = async () => {
      const response = await axios.get('/api/quote')
      setData(response.data);
    }

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a quote, a tag, an author or a username'
          value={searchText}
          required
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>


      <QuoteCardList 
        data={data}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed;