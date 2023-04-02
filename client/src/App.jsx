import React from 'react'
import Login from './pages/login/Login'
import './app.scss'
import { createBrowserRouter,Routes,Route, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import ImageDetail from './pages/imageDetail/ImageDetail'
import Add from './pages/uploadImage/Add'



const App = () => {
  const Layout=()=>{
    return (
      <>
      <Navbar/>
      <Outlet/>
      </>
 
  )}
  
  const router =createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/image-detail/:id",
          element:<ImageDetail/>
        },
        {
          path:"/addImage",
          element:<Add/>
        }
      ]
    }
  ])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App