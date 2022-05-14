import React,{useState,useEffect} from 'react'
import { API } from '../Api';
import { useQuery } from 'react-query';
import Title from '../Components/Title';
import Header from '../Components/Header';
import {GrCaretNext,GrChapterNext,GrCaretPrevious,GrChapterPrevious} from 'react-icons/gr';
import { Theme } from '../Colors.js/Color';
import { Link } from 'react-router-dom';
import PostCard from '../Components/PostCard';
import { Rings } from  'react-loader-spinner';
export default function PostList() {
    const [posts,setPosts]=useState([])
    const [err,setErr]=useState('')
    const [limit,setLimit]=useState(20);
    const [page,setPage]=useState(1);
    const [limitNumber,setlimitNumber]=useState([])

    useEffect(() => {
      //on mount clear error
    setErr('');
    //on mount fill an array of numbers of multiple 0 to 55   
    let tab = [...Array(11)].map((_, i) => i*5)
    //delete the 0 from tab so the first number will be 5 and  0 
    let nbr=tab.shift()
    setlimitNumber(tab)
    }, [])
// getpost ws call 
    const getPosts= ()=>{
       return   API.get(`/post`,{ params: { limit :limit, page:page } })
    }

     //caching data with react query 
  const {isLoading,refetch,isFetching} = useQuery('getPosts',getPosts,{
              
    onSuccess:(res)=>{
     setPosts(res)
    },
    onError:(err)=>{
       setErr('something went wrong ,please try again') 
    }
  });

const handelLimit=async (e)=>{

 await  setLimit(Number(e.target.value))
  refetch()
}

const decriment=async ()=>{
  if(page>0) await setPage(Number(page)-1)
refetch()
}
const incriment=async()=>{
 await setPage(Number(page)+1)
 refetch()
}

  return (
<div> 
<Header/>
<Title title="Posts's List"/>
<div className='formPaginationContainer'>
<div>
<span style={{padding:10}}>Limit</span>
<select onChange={(e)=>handelLimit(e)} value={limit}>
{limitNumber&&limitNumber.map((l,index)=>{
  return (<option key={index} value={l}>{l}</option>)
})}
</select>
   </div>
 <div className='previousNext'>
 <button className='unsetBtn' onClick={()=>decriment()}> <GrCaretPrevious color={Theme.black} size={20}/></button>
 <span style={{padding:20}}>{page}</span>
 <span>Page</span>
 <button className='unsetBtn' onClick={()=>incriment()}> <GrCaretNext color={Theme.black} size={20}/></button>
 </div>
 </div>


{ isLoading||isFetching? 
   (
  <div className='spinner'>
<Rings
color={Theme.yellow}
width={'50%'}
height={'50%'}
ariaLabel='loading'
/>
</div>
)

:
<div className='cardContainer'>
{posts?.data?.data.map(post=>
  <PostCard 
  post={post}
  />
  )}
  </div>
}



</div>

  )
}
