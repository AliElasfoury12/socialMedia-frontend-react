import { Link } from "react-router-dom"
import SearchBar from "../search/SearchBar"
import Notification from "../Notifications/Notification"
import NavLeft from "./NavLeft"
import { useSelector } from "react-redux"

export default function Nav() {
    let { authUser } = useSelector(state => state.auth)
    
    return (
        <div 
            className="sticky top-0 z-20">
            <div
                className="flex justify-between px-5 py-2 bg-blue-900 text-white ">

                <div
                    className="flex items-center gap-3">
                    <Link 
                        to={'/'} className="text-xl mb-1">
                        birdy
                    </Link>

                   {authUser?  <SearchBar/> : ''}               
                </div>
                    
                {authUser? 
                <>
                    <Notification/>
                    <NavLeft/>
                </> : 
                <div className="flex gap-4">
                    <Link to={'/register'}>Register</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
                }

            </div>
        </div>
    )
}