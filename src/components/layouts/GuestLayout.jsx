import { useSelector } from "react-redux"
import {  Navigate, Outlet } from "react-router-dom"

export default function GuestLayout () {
   //let {token} = useSelector(state => state.auth)
   let token = localStorage.getItem('token')

      if(token) {
         return <Navigate to='/'/> 
      }  
   
   return(
      <div>    
         <Outlet/>
      </div>
   )
}
