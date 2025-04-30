import userPhoto from '../../assets/user.png'
import { Camera } from "lucide-react"
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector } from 'react-redux'
import { profileStorage } from '../../stores/statices'
import Modal from '../Modal'
import EditProfilePicture from './EditProfilePicture'

export default function ProfilePicture() {
    let {user} = useSelector(state => state.profile)
    let storage = profileStorage
    let {id} = useParams()
    let {authUser} = useSelector(state => state.auth)
    let [show, setShow] = useState(false)

    let component = ()=> {
        return <EditProfilePicture setShow={setShow} />
    }

    return (
        <div className='relative'>
            <img 
                className="w-24 h-24 border-gray-500  border-4 rounded-full bg-slate-500" 
                src={ user.img ? storage + user.img : userPhoto} /> 

            {id == authUser.id && 
                <button 
                    onClick={() => setShow(true)}
                    className="absolute top-16 right-0 bg-blue-600 p-1 rounded-full">
                    <Camera/>
                </button>
            }

            {show && <Modal show={show} setShow={setShow} Component={component} />}
        </div>
    )
}