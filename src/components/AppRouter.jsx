import React from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import About from "../pages/About";
import Error from '../pages/Error';
import PostIdPage from "../pages/PostIdPage";
import Posts from '../pages/Posts';

const AppRouter = () => {
    return (
    <Routes>
      <Route path="/about" element={<About/>}/>
      <Route exact path="/posts" element={<Posts/>}/> 
      <Route exact path="/posts/:id" element={<PostIdPage/>}/> 
      <Route path="/404" element={<Error />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
    )
}

export default AppRouter
