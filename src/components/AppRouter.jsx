import React, { useContext } from "react";
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from "../context";
import About from "../pages/About";
import Error from '../pages/Error';
import PostIdPage from "../pages/PostIdPage";
import Posts from '../pages/Posts';
import { privateRoutes, publicRoutes } from "../router";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader/>
  }
    return (
      isAuth
      ? 
      <Routes>
      {privateRoutes.map(route => 
        <Route 
        element={route.element} 
        path={route.path} 
        exact={route.exact}
        key={route.path}
        />
      )}
      <Route exact path="/" element={<Navigate replace to="/posts" />}/> 
      <Route exact path="/login" element={<Navigate replace to="/posts" />}/> 
      </Routes>
      : 
      <Routes>
      {publicRoutes.map(route => 
        <Route 
        element={route.element} 
        path={route.path} 
        exact={route.exact}
        key={route.path}
        />
      )}
      <Route path="*" element={<Navigate replace to="/login" />}/> 
      </Routes> 
    )
}

export default AppRouter;

 {/* <Routes>
    {privateRoutes.map(route => 
      <Route 
      element={route.element} 
      path={route.path} 
      exact={route.exact}
      />
    )}
    {publicRoutes.map(route => 
      <Route 
      element={route.element} 
      path={route.path} 
      exact={route.exact}
      />
    )}
      <Route path="/about" element={<About/>}/>
      <Route exact path="/posts" element={<Posts/>}/> 
      <Route exact path="/posts/:id" element={<PostIdPage/>}/> 
      <Route path="/404" element={<Error />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes> */}
