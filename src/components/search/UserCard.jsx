import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { profileStorage } from "../../main"
import User from '../../assets/user.png'

export default function UserCard({element: user}) {

    return(
        <Link
            to={'/user/profile/'+user.id+'/posts'}
            className='flex items-center gap-2 mt-2 p-2 bg-blue-400 rounded-xl w-[30rem]'>

            <img 
                className="w-20 h-20 border-black  border-2 rounded-full" 
                src={user.profile_pic?.url ? profileStorage + user.profile_pic.url : User}
            /> 
            <p   
                className="text-xl">
                {user.name}
            </p>
        </Link>
    )
}

UserCard.propTypes = {
    element: PropTypes.object
}
