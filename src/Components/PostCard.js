import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap'
export default function PostCard({post}) {
//console.log(post)
  return (
    <Card className='cardContainer' style={{ width:'80%'}}>
    <img src={post.image} className="imgpost"/>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
      <button variant="primary">Go somewhere</button>
    </Card.Body>
  </Card>

  )
}
