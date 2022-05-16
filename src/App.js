import React ,{useEffect,useState} from 'react'
import './App.css';
import {API} from './Api';
import { ReactQueryDevtools } from 'react-query/devtools';
import PostList from './Screens/PostList';
import Header from './Components/Header';
import PostDispaly from './Screens/PostDispaly';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {

  
  return (
    <BrowserRouter>

    <Routes>
   <Route path="/weviootechnicaltest" element={<PostList/>} />
   <Route path="/PostDispaly" element={<PostDispaly/>} />
   </Routes>
   <ReactQueryDevtools initialIsOpen={false} />
   </BrowserRouter>
  );
}

export default App;
