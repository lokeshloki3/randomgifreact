import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Random = () => {

    const [gif,setGif]= useState('');
    const [loading,setLoading]=useState('false');

    async function fetchData(){
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
        // api call using axios returns promise
        // const output = await axios.get(url);
        // destructure data from output
        const {data} = await axios.get(url);
        const imgSource = data.data.images.downsized_large.url;
        // console.log({data});
        // console.log(imgSource);
        setGif(imgSource);
        setLoading(false)
    }

    useEffect(()=>{
        fetchData();
    },[])

    function clickHandler(){
        fetchData();
    }

  return (
    <div className='w-1/2 bg-green-500 rounded-lg border border-black
    flex flex-col items-center gap-y-5 mt-[15px]'>
        <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>A Random GIF</h1>
        {
            loading ? <Spinner/> : (<img src={gif} width='450' alt=''/>)
        }
        <button onClick={clickHandler} 
        className="w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]">
            Generate
        </button>
    </div>
  )
}

export default Random