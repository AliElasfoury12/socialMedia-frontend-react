import { Link } from "react-router-dom"
import SearchBar from "../search/SearchBar"
import Notification from "../Notifications/Notification"
import NavLeft from "./NavLeft"
import { useSelector } from "react-redux"
import { Else, If, IfElse } from "../Common/IfElse"

export default function Header() {
    const { token } = useSelector(state => state.auth)
    
    return (
        <header 
            className="sticky top-0 z-20">
            <div
                className="flex justify-between px-5 py-2 bg-blue-900 text-white ">

                <div
                    className="flex items-center gap-3">
                    <Link 
                        to={'/'} className="text-xl mb-1">
                        birdy
                    </Link>

                   {token?  <SearchBar/> : ''}               
                </div>
                    
                <IfElse condition={token}>
                    <If>
                        <Notification/>
                        <NavLeft/>
                    </If>
                    <Else>
                        <div className="flex gap-4">
                            <Link to={'/register'}>Register</Link>
                            <Link to={'/login'}>Login</Link>
                        </div>
                    </Else>
                </IfElse>
            </div>
        </header>
    )
}