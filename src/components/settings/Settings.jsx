import { Link } from "react-router-dom"

export default function Settings() {

  return (
    <div 
        className="flex flex-col items-center">
        <Link
            to={'/settings/change user name & email'}
            className="bg-blue-500 py-4 w-96 flex justify-center rounded-lg mt-10 mb-1">
            Change User Name and Email
        </Link>

        <Link  
            to={'/settings/change password'}
            className="bg-blue-500 py-4 w-96 flex justify-center rounded-lg mb-1">
            Change Password
        </Link>  

         <Link 
            to={'/settings/delete user'}
            className="bg-blue-500 py-4 w-96 flex justify-center rounded-lg mb-1">
            Delete User
        </Link> 
    </div>
  )
}