"use client"

import React, { useState, useEffect } from 'react'
import QuoteCard from './QuoteCard';
import axios from 'axios';
import toast from 'react-hot-toast';

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
          // handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [reset, setReset] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState([]);
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value == "") {
      setReset((prev) => !prev);
    }
  }

  useEffect(() => {
    // fetch quotes from the server
    const fetchPosts = async () => {
      const response = await axios.get('/api/quote')
      setData(response.data);
    }

    fetchPosts();
  }, [reset]);

  const fetchPostsFromString = async (e:Event) => {
    e.preventDefault();
    
    const promise = new Promise((resolve, reject) => {
      axios.get(`/api/quote?string=${searchText}`).then((response) => {
        console.log(response);
        setData(response.data);
        resolve("");
      }).catch((err) => {
        reject(err);
      })
      
    })
    toast.promise(promise, {
      success: "Quotes Fetched",
      error: "Unable to Fetch Quotes Right Now", 
      loading: "Loading.."
    })
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' onSubmit={fetchPostsFromString}>
        <input 
          type="text" 
          placeholder='Search for a quote, a tag, an author or a username'
          value={searchText}
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