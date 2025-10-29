import { useSelector } from "react-redux";
import SettingsDownList from "./SettingsDownList";
import { useState } from "react";
import { profileStorage } from "../../main";
import { Link } from "react-router-dom";
import user from '../../assets/user.png'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import { useDispatch } from 'react-redux'
import { logout } from "../../stores/auth/auth_slice"

export default function NavLeft() {
    const dispatch = useDispatch()
    const { authUser } = useSelector(state => state.auth)
    const [showList, setShowList] = useState(false)
    const [showConfirmDelte, setShowConfirmDelete] = useState(false)

	function ConfirmDeleteFunc () {
		dispatch(logout())
	}
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
                    src={authUser.profile_pic?.url ?  profileStorage + authUser.profile_pic.url : user }
                />

                <Link 
                    className="text-xl"
                    to={'/user/profile/' + authUser.id + '/posts'}>
                    {authUser.name}
                </Link>
            
            </div>

            {showList && <SettingsDownList setShowConfirmDelete={setShowConfirmDelete}/>}

            <DeleteConfirmModal
				showConfirmDelete={showConfirmDelte}
				setShowConfirmDelete={(s) => setShowConfirmDelete(s)}
				confirmDeleteFunction={ConfirmDeleteFunc}/>
       </>
    )
}
