import React, { useContext } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from "../context";
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
    
      <Route path="/about" element={<About/>}/>
      <Route exact path="/posts" element={<Posts/>}/> 
      <Route exact path="/posts/:id" element={<PostIdPage/>}/> 
      <Route path="/404" element={<Error />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes> */}
