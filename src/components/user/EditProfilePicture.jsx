import PropTypes from 'prop-types'
import userPhoto from '../../assets/user.png'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {setAuthUser} from '../../stores/authStore'
import { profileStorage } from "../../stores/statices"
import { changeProfileImage } from '../../stores/profileStore'
import SmallLoadingSpinner from '../LoadingSpinner/SmallLoadingSpinner'

export default function EditProfilePicture({setShow}) {
    const dispatch = useDispatch()
    const {user, loading} = useSelector(state => state.profile)
    const [image, setImage] = useState('')

    function changePhoto (e) {
        e.preventDefault()
        const  formdata = new FormData
        formdata.append('image', image)

        dispatch(changeProfileImage(formdata))
        .then(() => {
            setShow(false)
        })
    }

    useEffect(() => {        
        dispatch(setAuthUser(user))
    },[user])


    return (
        <form
            onSubmit={changePhoto}
            className=" flex flex-col w-fit my-3 py-1 px-2 min-w-80 m-auto">
            <div className="flex justify-between my-2">
                
                <label
                    htmlFor="profileImg"
                    className="bg-blue-600 p-1 rounded-full w-40 text-center cursor-pointer">
                    Choose Photo
                </label>

                <button
                    type='submit'
                    className="bg-blue-600 p-1 rounded-full w-40">
                    Update
                </button>
            </div>

            <input 
                id="profileImg" className="hidden"
                onChange={e => setImage(e.target.files[0])}
                type="file" />

            <img 
                src={image ? URL.createObjectURL(image) : (user.profile_pic.url ? profileStorage + user.profile_pic.url : userPhoto )}
                className="w-96 h-96 rounded-full my-2" />

            {loading && <SmallLoadingSpinner/>}
        </form>
    )
}

EditProfilePicture.propTypes = {
    setShow: PropTypes.func,
}