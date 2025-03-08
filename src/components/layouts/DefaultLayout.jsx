import {   Navigate, Outlet } from "react-router-dom"
import Nav from "./Nav"

export default function DefaultLayout () {
 let token = localStorage.getItem('token')

    if(!token) {
        return <Navigate to={'/login'}/> 
    }
        

  return (
     <div>
        <Nav/>
        <Outlet/>
    </div>
  )
}