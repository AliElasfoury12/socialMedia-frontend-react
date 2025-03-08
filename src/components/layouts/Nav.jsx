import { Link } from "react-router-dom"
import user from '../../assets/user.png'
import { useSelector } from "react-redux"
import SettingsDownList from '../settings/SettingsDownList'
import { useState } from "react"
import SearchBar from "../search/SearchBar"
import Notification from "../Notifications/Notification"
import { profileStorage } from "../../stores/statices"

export default function Nav() {
    let { authUser } = useSelector(state => state.auth)
    let [showList, setShowList] = useState(false)
    let storage = profileStorage

    window.addEventListener('click',  (e) => {
        let profileImg = document.getElementById("profile-img")
        e.target != profileImg && setShowList(false)         
    })

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

                    <SearchBar/>                    
                </div>

                <Notification/>

                <div 
                    className="flex mr-5 items-center">
                    <img 
                        id="profile-img"
                        onClick={() => setShowList(!showList)}
                        className="w-8 h-8 border-black border-2 rounded-full mx-5"
                        src={authUser.img ? storage + authUser.img : user }
                    />

                    <Link 
                        className="text-xl"
                        to={'/user/profile/' + authUser.id + '/posts'}>
                        {authUser.name}
                    </Link>
                
                </div>
            </div>

                {showList && <SettingsDownList/>}
        </div>
    )
}