import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {

    const [gif,setGif]= useState('');
    const [loading,setLoading]=useState('false');
    const [tag,setTag]=useState('car');

    async function fetchData(){
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        // api call using axios returns promise
        // const output = await axios.get(url);
        // destructure data from output
        const {data} = await axios.get(url);
        const imgSource = data.data.images.downsized_large.url;
        // console.log({data});
        // console.log(imgSource);
        setGif(imgSource);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    },[])

    function changeHandler(event){
        setTag(event.target.value);
    }

  return (
    <div className='w-1/2 bg-green-500 rounded-lg border border-black
    flex flex-col items-center gap-y-5 mt-[15px]'>
        <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>Random {tag} GIF</h1>
        {
            loading ? <Spinner/> : (<img src={gif} width='450' alt=''/>)
        }

        <input className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
        value={tag}
        onChange={changeHandler}
        />
        <button onClick={()=> fetchData()} 
        className="w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]">
            Generate
        </button>
    </div>
  )
}

export default Tag

{/* <input 
className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
onChange={(event) =>  setTag(event.target.value)}
value={tag}
/> */}