import cover from '../../assets/cover.jpeg'
import ProfilePicture from "./ProfilePicture"
import { useSelector } from "react-redux"
import Follow from "../Posts/postCard/components/postCardHeader/Follow"
import { Link } from "react-router-dom"

export default function ProfileHeader() {
    const {user} = useSelector(state => state.profile)
    const {authUser} = useSelector(state => state.auth)
    
    return (
        <div className="w-fit flex flex-col items-center relative mb-28">

            <img className='w-[50rem] h-[20rem]' src={cover} />

            <div 
                className="flex items-center absolute -bottom-20 justify-between w-[47rem]">
                <div 
                    className="flex flex-col" >
                    
                    <ProfilePicture user={user} />

                    <h1 className="text-center text-2xl mt-2"> 
                        {user.name}
                    </h1>
                </div>

                <div className="flex gap-4 mt-8 text-2xl">
                    <p> followers  {user.followers_count} </p>
                    <p> followings {user.followings_count}</p>
                </div>

                { user.id == authUser.id ? 
                    <Link 
                        to={'/settings'}
                        className='bg-blue-600 rounded-md w-24 py-1 mt-7 text-white text-center'>
                        Edit Profile
                    </Link> :
                        
                    <Follow 
                        userId={user.id} 
                        follows={user.follows} 
                        ClassName={'bg-blue-600 rounded-md w-24 py-1 mt-7 text-white'}/>
                }
            </div> 
        </div>
    )
}