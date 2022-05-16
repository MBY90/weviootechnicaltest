import React,{useState,useEffect} from 'react'
import Title from '../Components/Title'
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../Api';
export default function PostDispaly() {
const [post,setPost]=useState([]);
const[err,setErr]=useState('')
  const {state}=useLocation();
  console.log({state})
 
const getPostById=()=>{
return API.get(`/post/${state.id}/comment`)
}
  const {isLoading,refetch,isFetching} = useQuery('getPostById',getPostById,{
              
    onSuccess:(res)=>{
      console.log("hi",res)
     setPost(res)
    },
    onError:(err)=>{
       setErr('something went wrong ,please try again') 
    }
  });
  return (   
<Title title="Full Post"/>
  )
}
