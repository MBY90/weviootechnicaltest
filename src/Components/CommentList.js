import React from 'react'
import { Card} from 'react-bootstrap';
import { Theme } from '../Colors.js/Color';
export default function CommentList({comment}) {
    return (
        <div >
       <div className='sameline'>
        <div className="photoprofil">
        <Card.Img src={comment.owner.picture}/>
        </div>
        <span style={{color:'#6495ED'}}>{comment.owner.title} {comment.owner.firstName} {comment.owner.lastName}</span>
      </div>   
      <div>
      </div>
      <div className='returntoline'>
      <span>{comment.message} </span> 
      <div className='sameline'>
      <span style={{color:Theme.gray}}>{(comment.publishDate).slice(0,10)}</span>
   
      </div>
      </div>
    </div>
  )
}
