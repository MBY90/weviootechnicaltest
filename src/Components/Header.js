import React from 'react'
import { Theme } from '../Colors.js/Color'
import logoWevioo from '../images/wevioo_1.png'
export default function Header() {
  return (
   <div className='header'>
   <img src={logoWevioo} style={{padding:10}} />
   </div>
  )
}
