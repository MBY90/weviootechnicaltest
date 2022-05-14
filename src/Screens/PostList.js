import React,{useState,useEffect} from 'react'
import { API } from '../Api';
import { useQuery } from 'react-query';
import Title from '../Components/Title';
export default function PostList() {
    const [posts,setPosts]=useState([])
    const [err,setErr]=useState('')
    const [limit,setLimit]=useState(20);
    const [page,setPage]=useState(1);
    useEffect(() => {
    setErr('');
    }, [])
    
    const getPosts=()=>{
       return  API.get(`/post`,{ params: { limit :limit, page:page } })
    }
     //caching data with react query 
  const {isLoading} = useQuery('getPosts',getPosts,{
              
    onSuccess:(res)=>{
     setPosts(res)
    },
    onError:(err)=>{
       setErr('something went wrong ,please try again') 
    }
  });


  return (
<div> 
<Title title="Posts's List"/>


</div>

  )
}
