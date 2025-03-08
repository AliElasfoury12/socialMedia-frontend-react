import PropTypes from 'prop-types'
import userPhoto from '../../assets/user.png'
import { useState } from "react"
import Post from '../API/Post'
import { useDispatch, useSelector } from "react-redux"
import {setAuthUser} from '../../stores/authStore'
//import { setUser } from "../../stores/profileStore"
import { profileStorage } from "../../stores/statices"

export default function EditProfilePicture(props) {
    let dispatch = useDispatch()
    let {user} = useSelector(state => state.profile)
    let {setShow} = props
    let [img, setImg] = useState('')
    let storage = profileStorage

    let formdata = new FormData
    formdata.append('img', img)

    let changePhoto = () => {
        Post('change-profile-picture/' + user.id, formdata)
        .then((data) => {
           // dispatch(setUser(data.user))
            dispatch(setAuthUser(data.user))
            setShow(false)
        })
    }

    return (
        <div
            className=" flex flex-col w-fit my-3 py-1 px-2 min-w-80 m-auto">
            <div className="flex justify-between my-2">
                <label
                    htmlFor="profileImg"
                    className="bg-blue-600 p-1 rounded-full w-40 text-center">
                    Choose Photo
                </label>

                <button
                    onClick={changePhoto}
                    className="bg-blue-600 p-1 rounded-full w-40">
                    Update
                </button>
            </div>

            <input 
                id="profileImg" className="hidden"
                onChange={e => setImg(e.target.files[0])}
                type="file" />

            <img 
                src={img ? URL.createObjectURL(img) : (user.img ? storage + user.img : userPhoto )}
                className="w-96 h-96 rounded-full my-2" />
        </div>
    )
}

EditProfilePicture.propTypes = {
    setShow: PropTypes.func,
}