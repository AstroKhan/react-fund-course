
import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import About from './pages/About';
import Error from './pages/Error';
import Posts from './pages/Posts';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path="/about" element={<About/>}/>
      <Route path="/posts" element={<Posts/>}/> 
      <Route path="/404" element={<Error />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App;
