import React,{useState,useEffect} from 'react'
import { API } from '../Api';
import { useQuery } from 'react-query';
import Title from '../Components/Title';
import {GrCaretNext,GrChapterNext,GrCaretPrevious,GrChapterPrevious} from 'react-icons/gr';
import { Theme } from '../Colors.js/Color';
import PostCard from '../Components/PostCard';
import { Rings } from  'react-loader-spinner';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { MultiSelect } from 'primereact/multiselect';
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
    const[tag,setTag]=useState([]);
    const [limitUser,setLimitUser]=useState(20);
    const [pageUser,setPageUser]=useState(0);
    const [totalPage,setTotalPage]=useState();
    const [totalPageUser,setTotalPageUser]=useState();
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

  
    
//get lists of user &tags
const getUserTagList=async()=>{
const listUser= API.get(`/user`,{ params: { limit :limitUser,page:pageUser } })
const listTag=  API.get(`/tag`)
await axios.all([listUser,listTag]).then(axios.spread((res1, res2)=> {

  setUsers(res1);
  setTotalPageUser(Math.trunc(res1.data.total/res1.data.limit))
  setTags(res2.data.data);
})

).
catch(axios.spread((err1, err2)=>{
alert("something went wrong")
})
)
}


useEffect(() => {
  //get list of users and tags on mount
  getUserTagList();

 }, [limitUser,pageUser])

// getposts ws call 
    const getPosts= ()=>{
      if(isAllPost) return   API.get(`/post`,{ params: { limit :limit, page:page } })
      else if(isPostByUser) return API.get(`/user/${idUser}/post`,{ params: { limit :limit,page:page} })
      else if (isPostByTag) return  API.get(`/tag/${tag.replace(/\s/g,'')}/post`,{ params: { limit :limit, page:page} })
    }


     //caching data with react query 
  const {isLoading,refetch,isFetching} = useQuery('getPosts',getPosts,{
              
    onSuccess:(res)=>{
      setTotalPage(Math.trunc(res.data.total/res.data.limit))
     setPosts(res)
    },
    onError:(err)=>{
  alert('something went wrong ,please try again') 
    }
  });

const handelLimit=async (e)=>{

 await  setLimit(Number(e.target.value))
 refetch()
}
const handelLimitUser=async (e)=>{

  await  setLimitUser(Number(e.target.value))

 }

//decriment pages
const decriment=async ()=>{
  if(page>0)
 { await setPage(Number(page)-1)
  refetch()}
}
//incriment pages

const incriment=async()=>{
  if(page<=totalPage)
{ await setPage(Number(page)+1)
 refetch()}
}
//decriment users pages
const decrimentUser=async ()=>{
  if(pageUser>0)
{ await setPageUser(Number(pageUser)-1)}
 
}
//incriment user pages
const incrimentUser=async()=>{
  if(pageUser<=totalPageUser)
{ await setPageUser(Number(pageUser)+1)}

}


//handel search by userId
const handelSearchByUser= async()=>{
  if(idUser!==""){
    await setIsAllPost(false);
    await setIsPostByUser(true);
    await setIsPostTag(false);
    refetch()

  }
  else alert("please select a user")
}

//handel search by tag
const handelSearchByTag= async()=>{
  if(tag!==""){
    await setIsAllPost(false);
    await setIsPostByUser(false);
    await setIsPostTag(true);
    setIdUser("")
    refetch()
  }
  else alert("please select a tag")
  }

  /**  useEffect( () => {
 let temp = tags.map((t,index)=>(
   
  {
    label:index,
    value:t.replace(/\s/g,''),
  }
 )
  )
setTags(temp)
  }, [])
console.log({tags})
*/
  return (
<div> 
<Title title="Posts's List"/>
{/** user container */}
<center>
<div className='searchContainer'>
  <span style={{color:Theme.yellow ,fontWeight:'bold'}}>Research by User</span>
  <div className='selctandbtn'>
<select onChange={(e)=>setIdUser(e.target.value)}  className="form-select ">
<option value="" disabled selected>
Search by user
</option>
{ users?.data?.data.map((u,index)=>{
  return <option  style={{color:Theme.gray}} key={u.id} value={u.id}>{u.firstName} {u.lastName }</option>
})}
</select>
<div>
<Button type="button" className='btnProfil' onClick={()=>handelSearchByUser()}>Search</Button>
</div>
</div>
<div className='formPaginationContainer'>
<div>
<span style={{padding:10}}>Limit User</span>
<select onChange={(e)=>handelLimitUser(e)} value={limitUser}>
{limitNumber&&limitNumber.map((l,index)=>{
  return (<option key={index} value={l}>{l}</option>)
})}
</select>
   </div>
 <div className='previousNext'>
{ pageUser!==0?<button className='unsetBtn' onClick={()=>decrimentUser()}> <GrCaretPrevious color={Theme.black} size={20}/></button>:null}
 <span style={{padding:20}}>{pageUser}</span>
 <span>Page User</span>
{ totalPageUser!==pageUser?<button className='unsetBtn' onClick={()=>incrimentUser()}> <GrCaretNext color={Theme.black} size={20}/></button>:null}
 </div>
 </div>
</div>
</center>
<br/>
{/** tag container */}
<center>
<div className='searchContainer'>
  <span style={{color:Theme.yellow ,fontWeight:'bold'}}>Research by Tag</span>
  <div className='selctandbtn'>
  <MultiSelect 
  optionLabel="select a tag"
   value={tag} 
   filter
   options={tags}
  onChange={(e) => setTag(e.value)} 
    />
<div>
<Button type="button" className='btnProfil' onClick={()=>handelSearchByTag()}>Search</Button>
</div>
</div>
</div>
</center>
<div className='formPaginationContainer'>
<div>
<span style={{padding:10}}>Limit</span>
<select onChange={(e)=>handelLimit(e)} value={limit}>
{limitNumber&&limitNumber.map((l)=>{
  return (<option key={l} value={l}>{l}</option>)
})}
</select>
   </div>
 <div className='previousNext'>
{page!==0? <button className='unsetBtn' onClick={()=>decriment()}> <GrCaretPrevious color={Theme.black} size={20}/></button>:null}
 <span style={{padding:20}}>{page}</span>
 <span>Page</span>
 {totalPage!==page? <button className='unsetBtn' onClick={()=>incriment()}> <GrCaretNext color={Theme.black} size={20}/></button>:null}
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
  key={post.id}
  post={post}
  />
  )}
  </div>
}
</div>
  )
}
