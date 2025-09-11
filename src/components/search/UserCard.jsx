import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { profileStorage } from "../../stores/statices"
import User from '../../assets/user.png'

export default function UserCard(props) {
    let {element: user} = props
    let storage = profileStorage
    
    return(
        <Link
            to={'/user/profile/'+user.id+'/posts'}
            className='flex items-center gap-2 mt-2 p-2 bg-blue-400 rounded-xl'
            style={{width: '30rem'}}>

            <img 
                className="w-20 h-20 border-black  border-2 rounded-full" 
                src={user.profile_pic.url ? storage + user.profile_pic.url : User}
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
