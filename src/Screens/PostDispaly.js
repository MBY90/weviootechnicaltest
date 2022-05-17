import React,{useState,useEffect} from 'react'
import Title from '../Components/Title'
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../Api';
import { Theme } from '../Colors.js/Color';
import {Card,Badge} from 'react-bootstrap';
import {AiOutlineLike} from 'react-icons/ai';
import CommentList from '../Components/CommentList';
import {GrCaretNext,GrCaretPrevious} from 'react-icons/gr';
import {FaPlay} from 'react-icons/fa'
export default function PostDispaly() {
const [comments,setComments]=useState([]);
const[err,setErr]=useState('')
const [page,setPage]=useState(0)
const {state}=useLocation();
const [newComment,setNewComment]=useState('');
const [totalPag,setTotalPage]=useState()
const getCommentByPost=()=>{
return API.get(`/post/${state.id}/comment`,{limit:10,page:page})
}
  const {isLoading,refetch,isFetching} = useQuery('getCommentByPost',getCommentByPost,{
              
    onSuccess:(res)=>{
  
     setComments(res.data.data)
    },
    onError:(err)=>{
       setErr('something went wrong ,please try again') 
    }
  });
  //decriment pages
const decriment=async ()=>{
  if(page!=0)
 { await setPage(Number(page)-1)
  refetch()}
}

//incriment pages
const incriment=async()=>{
  
 await setPage(Number(page)+1)
 refetch()
}
const handelSendComment=()=>{
  let comment={
message:newComment,
owner:"60d0fe4f5311236168a109ca",
post:state.id
  }
API.post(`/comment/create`,comment).then(res=>{

  refetch();
  setNewComment("");
})
.catch(err=>{
  console.log({err})
})
}

  return (
    <div>
<Title title="Full Post"/>
<center>
<Card className='cardContainer' style={{ width:'80%',marginTop:10}}>

      <div className='sameline'>
        <div className="photoprofil">
        <Card.Img src={state.owner.picture}/>
        </div>
        <span>{state.owner.title} {state.owner.firstName} {state.owner.lastName}</span>
      </div>
      <Card.Text>
       {state.text}
      </Card.Text>
      <span style={{color:Theme.gray}}>{(state.publishDate).slice(0,10)}</span>
      <div className='cardpictagcontainer'>
    <Card.Img src={state.image} className="imgpost"  />

    {state.tags.map((t)=>{
      return <Badge key={t} className='tag'>#{t}</Badge>
    })}
    </div>  
    <Card.Body>
      <div className='selctandbtn'>
        <AiOutlineLike
        color="#6495ED"
        size={70}
        style={{padding:20}}
        />
        <span style={{color:"#6495ED",fontSize:20,fontWeight:'bold',padding:20}}>{state.likes}</span>
      </div>
     
    </Card.Body>
    <Card.Footer>
    <span>comments</span>
    <div className='previousNext'>
 <button className='unsetBtn' onClick={()=>decriment()}> <GrCaretPrevious color={Theme.black} size={20}/></button>
 <span style={{padding:20}}>{page}</span>
 <span>Page</span>
 <button className='unsetBtn' onClick={()=>incriment()}> <GrCaretNext color={Theme.black} size={20}/></button>
 </div>
{comments.map(comment=>{
  return(
    <div  key={comment.id}>

      <br/>
      <CommentList
      comment={comment}
      />
    </div>
  )
})}

<label style={{padding:20}}>Add comment</label>
      <input
      type="text"
      value={newComment}
      onChange={(e)=>setNewComment(e.target.value)}
      />
      <button className='unsetBtn' onClick={()=>handelSendComment()} title="Send comment" type="button"> 
      <FaPlay
      size={70}
      color="#6495ED"
      style={{padding:20}}
      />
      </button>
    </Card.Footer>
  </Card>

  </center>
  </div>

  )
}
