import { useSelector } from "react-redux";
import SettingsDownList from "../settings/SettingsDownList";
import { useState } from "react";
import { profileStorage } from "../../stores/statices";
import { Link } from "react-router-dom";
import user from '../../assets/user.png'

export default function NavLeft() {
    let { authUser } = useSelector(state => state.auth)
    let [showList, setShowList] = useState(false)
    let storage = profileStorage

    window.addEventListener('click',  (e) => {
        let profileImg = document.getElementById("profile-img")
        e.target != profileImg && setShowList(false)         
    })

    return (
       <>
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

            {showList && <SettingsDownList/>}
       </>
    )
}
