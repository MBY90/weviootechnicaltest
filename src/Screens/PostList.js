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
import axios from 'axios';

export default function PostList() {
    const [posts,setPosts]=useState([])
    const [err,setErr]=useState('')
    const [limit,setLimit]=useState(20);
    const [page,setPage]=useState(0);
    const [limitNumber,setlimitNumber]=useState([])
    const [isAllPost,setIsAllPost]=useState(true);
    const [isPostByUser,setIsPostByUser]=useState(false);
    const [isPostByTag,setIsPostTag]=useState(false);
    const[users,setUsers]=useState([]);
    const[tags,setTags]=useState([]);
    const [idUser,setIdUser]=useState('');
    const[tag,setTag]=useState('');

//on mount ofcomponenet do those actions
    useEffect(() => {


      //on mount clear error
    setErr('');

    //on mount fill an array of numbers of multiple 5 limit is  50
    let tab = [...Array(11)].map((_, i) => i*5)
    //delete the 0 from tab so the first number will be 5 and  0 
    let nbr=tab.shift()
    setlimitNumber(tab)
    }, [])

  
    
//get lists of user 
const getUserTagList=async()=>{
const listUser= API.get(`/user`,{ params: { limit :limit } })
const listTag=  API.get(`/tag`,{ params: { limit :limit } })
await axios.all([listUser,listTag]).then(axios.spread((res1, res2)=> {
  setUsers(res1);
  setTags(res2);
})

).
catch(axios.spread((err1, err2)=>{
console.log({err1})
console.log({err2})
})
)
}


useEffect(() => {
  //get list of users and tags on mount
  getUserTagList();

 }, [limit])

// getposts ws call 
    const getPosts= ()=>{
      if(isAllPost) return   API.get(`/post`,{ params: { limit :limit, page:page } })
      else if(isPostByUser) return API.get(`/user/${idUser}/post`,{ params: { limit :limit,page:page} })
      else if (isPostByTag) return  API.get(`/tag/${tag}/post`,{ params: { limit :limit, page:page} })
    }

     //caching data with react query 
  const {isLoading,refetch,isFetching} = useQuery('getPosts',getPosts,{
              
    onSuccess:(res)=>{
      console.log({res})
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
//decriment pages
const decriment=async ()=>{
  if(page>0) await setPage(Number(page)-1)
  refetch()
}
//incriment pages
const incriment=async()=>{
 await setPage(Number(page)+1)
 refetch()
}
//handel search by userId
const handelSearchByUser= async()=>{
await setIsAllPost(false);
await setIsPostByUser(true);
await setIsPostTag(false);
refetch()
}
  return (
<div> 
<Title title="Posts's List"/>
<center>
<div className='searchContainer'>

<label>Search by user </label>

<select onChange={(e)=>setIdUser(e.target.value)}  className="form-select">
{ users?.data?.data.map((u,index)=>{
  return <option style={{color:Theme.gray}} key={u.id} value={u.id}>{u.firstName} {u.lastName }</option>
})}
</select>
<div>
<button type="button" className='btnProfil' onClick={()=>handelSearchByUser()}>Search</button>
</div>
</div>
</center>
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
