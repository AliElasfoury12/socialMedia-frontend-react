import cover from '../../assets/cover.jpeg'
import ProfilePicture from "./ProfilePicture"
import { useSelector } from "react-redux"
import Follow from "../Posts/postCard/components/postCardHeader/Follow"
import { Link, useParams } from "react-router-dom"

export default function ProfileHeader() {
    let {user} = useSelector(state => state.profile)
    let {id} = useParams()
    let {authUser} = useSelector(state => state.auth)

    let followers = user?.followers_count
    let followings = user?.followings_count
    let following = user?.follows
    
    return (
        <div className="w-fit flex flex-col items-center relative mb-28">

        <img  src={cover} style={{width:'50rem', height: '20rem'}} />

        <div 
            className="flex items-center absolute -bottom-20 justify-between w-[47rem]">
            <div 
                className="flex flex-col" >
                
                <ProfilePicture user={user}/>

                <h1 className="text-center text-2xl mt-2"> 
                    {user?.name}
                </h1>
            </div>

            <div className="flex gap-4 mt-8 text-2xl">
                <p> followers  {followers} </p>
                <p> followings {followings}</p>
            </div>

            { id == authUser.id ? 
                <Link 
                    to={'/settings'}
                    className='bg-blue-600 rounded-md w-24 py-1 mt-7 text-white text-center'>
                    Edit Profile
                </Link> :
                    
                <Follow 
                id={user.id} 
                follows={following} 
                ClassName={'bg-blue-600 rounded-md w-24 py-1 mt-7 text-white'}/>
            }
         </div> 

    </div>
    )
}