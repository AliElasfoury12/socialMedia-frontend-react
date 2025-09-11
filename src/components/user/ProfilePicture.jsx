import userPhoto from '../../assets/user.png'
import { Camera } from "lucide-react"
import { useState } from 'react'
import {useSelector } from 'react-redux'
import { profileStorage } from '../../stores/statices'
import Modal from '../Modals/Modal'
import EditProfilePicture from './EditProfilePicture'

export default function ProfilePicture() {
    const {user} = useSelector(state => state.profile)
    const {authUser} = useSelector(state => state.auth)
    const [show, setShow] = useState(false)

    return (
        <div className='relative'>
            <img 
                className="w-24 h-24 border-gray-500  border-4 rounded-full bg-slate-500" 
                src={ user.profile_pic?.url ? profileStorage + user.profile_pic.url : userPhoto} /> 

            {user.id == authUser.id && 
                <button 
                    onClick={() => setShow(true)}
                    className="absolute top-16 right-0 bg-blue-600 p-1 rounded-full">
                    <Camera/>
                </button>
            }

            <Modal show={show} setShow={setShow} >
                <EditProfilePicture setShow={setShow} />
            </Modal>
        </div>
    )
}