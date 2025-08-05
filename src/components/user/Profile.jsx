import { Link, Outlet, useHref, useParams } from "react-router-dom"
import {useEffect } from "react"
import ProfileHeader from "./ProfileHeader"
import { useDispatch, useSelector} from "react-redux"
import { getProfileUser } from "../../stores/profileStore"
import BigLoadingSpinner from "../LoadingSpinner/LoadingSpinner"

export default function Profile ()  {
    const dispatch = useDispatch()
    const {loading , usersPosts} = useSelector(state => state.profile)
    const {userId} = useParams()
    const url = useHref()

    useEffect(() => {
        dispatch(getProfileUser(userId))
    },[])

    if(loading && usersPosts[userId] == undefined){ 
        return (
            <div className="grid place-items-center w-screen h-screen">
                <BigLoadingSpinner/>
            </div>
        )
    }

    return(
        <div className="flex flex-col items-center">

           <ProfileHeader />

            <div className="flex gap-8 w-60 justify-between">
                <Link 
                    to={`/user/profile/${userId}/posts`}
                    className={url.includes('posts') ? 'border-b-2 border-gray-500' : ''}>
                    Posts
                </Link>
                <Link
                    to={`/user/profile/${userId}/profile-pictures`}
                    className={url.includes('pictures') ? 'border-b-2 border-gray-500' : ''}>
                    Profile Pictures
                </Link>
            </div>
            <hr className=" w-64 bg-black my-2 h-[2px]" />

            <Outlet />
        </div>
    )
}