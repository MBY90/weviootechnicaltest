import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card ,Badge, Button,NavLink } from 'react-bootstrap'
import {AiOutlineLike} from 'react-icons/ai';
import { Theme } from '../Colors.js/Color';
export default function PostCard({post}) {
  const navigate=useNavigate();
  const handelNavigation=()=>{
    navigate('/PostDispaly',{state:post})
  }
console.log(post)
  return (
    <Card className='cardContainer' style={{ width:'80%',marginTop:10}}>
      <div className='sameline'>
        <div className="photoprofil">
        <Card.Img src={post.owner.picture}/>
      
        </div>
        <span>{post.owner.title} {post.owner.firstName} {post.owner.lastName}</span>
      </div>
      <div className='cardpictagcontainer'>
    <Card.Img src={post.image} className="imgpost"  />
  <span style={{color:Theme.gray}}>{post.publishDate}</span>
    {post.tags.map(t=>{
      return <Badge className='tag'>#{t}</Badge>
    })}
    </div>  
    <Card.Body>
      <div className='selctandbtn'>
        <AiOutlineLike
        color="#6495ED"
        size={80}
        style={{padding:20}}
        />
        <span style={{color:"#6495ED",fontSize:20,fontWeight:'bold',padding:20}}>{post.likes}</span>
      </div>
      <Card.Text>
       {post.text}
      </Card.Text>
      <Button className='btnProfil'  onClick={()=>handelNavigation()} >Explore post</Button>
    </Card.Body>
  </Card>

  )
}
