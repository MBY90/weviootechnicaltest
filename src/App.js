import React ,{useEffect,useState} from 'react'
import './App.css';
import {API} from './Api';
import { ReactQueryDevtools } from 'react-query/devtools';
import PostList from './Screens/PostList';
import Header from './Components/Header';
function App() {
  return (
   <div>
   <Header/>
   <PostList/>
   <ReactQueryDevtools initialIsOpen={false} />
   </div>
  );
}

export default App;
