import { Link, Outlet, useHref, useParams } from "react-router-dom"
import {useEffect} from "react"
import ProfileHeader from "./ProfileHeader"
import { useDispatch, useSelector} from "react-redux"
import { profileUser, setLoading, setUserData, userPosts } from "../../stores/profileStore"

export default function Profile ()  {
    let dispatch = useDispatch()
    let {id} = useParams()
    let url = useHref()
    let {usersData, page} = useSelector(state => state.profile)

    let userData = usersData.find((userData) => userData.user.id == id)

    useEffect(() => {
        if(!userData) {
            dispatch(setUserData(''))
            dispatch(profileUser(id))
            dispatch(setLoading(true))
            dispatch(userPosts({id,page}))
        }else {
            dispatch(setUserData(userData))
        }
    },[id])

   return(
        <div className="flex flex-col items-center ">

           <ProfileHeader />

            <div className="flex gap-8 w-60 justify-between">
                <Link 
                    to={`/user/profile/${id}/posts`}
                    className={url.includes('posts') ? 'border-b-2 border-gray-500' : ''}>
                    Posts
                </Link>
                <Link
                    to={`/user/profile/${id}/profile-pictures`}
                    className={url.includes('pictures') ? 'border-b-2 border-gray-500' : ''}>
                    Profile Pictures
                </Link>
            </div>
            <hr style={{height: '2px'}} className=" w-64 bg-black my-2" />

            <Outlet />
        </div>
   )
}