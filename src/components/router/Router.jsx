import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginPage from "../common/auth/Login";
import Home from "../common/customer/Home"
import Navbar from "../common/customer/Navbar";
import KrishiGyan from "../common/customer/KrishiGyan";
import KrishiMart from "../common/customer/KrishiMart";


const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    
    {
      path: "/Login",
      element: <LoginPage/>, // "/admin" directly renders LoginPage
      errorElement: <h1>Error...</h1>,
    },
    {
        path : "/",
        element : <Navbar/>,
        children : [
    {
        path : "",
        element : <Home />,
        errorElement : <h1>Error...</h1>
    },
    {
        path : "Home",
        element : <Home />,
        errorElement : <h1>Error...</h1>
    },
    {
        path : "Navbar",
        element : <Navbar/>,
        errorElement : <h1>Error...</h1>
    },
    {
        path : "KrishiGyan",
        element : <KrishiGyan/>,
        errorElement : <h1>Error...</h1>
    },
    {
        path : "KrishiMart",
        element : <KrishiMart/>,
        errorElement : <h1>Error...</h1>
    }
    ]
    },
    {
        path:"/user",
        element:<h1>customer</h1>,
        children:[]
      },
  
         {
        // Fallback route: Redirect to login if no match is found
        path: "*",
        element: <Navigate to="/" />,
      },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={routesData}>{children}</RouterProvider>
    </React.Fragment>
  );
};

export default MainRouter;