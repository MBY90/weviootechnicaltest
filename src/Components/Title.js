import React from 'react'
import { Theme } from '../Colors.js/Color'
export default function Title({title}) {
  return (
    <center><h3 style={{color:Theme.yellow,padding:5}}>{title}</h3></center> 
  )
}
