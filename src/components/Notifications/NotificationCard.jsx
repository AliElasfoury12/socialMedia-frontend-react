import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import  User  from '../../assets/user.png'
import { timeAgo } from "../../utils/Moments"
import { profileStorage } from '../../main'
import { useDispatch } from 'react-redux'
import { setShow } from '../../stores/notifications/notifications_slice'
import { read } from '../../stores/notifications/notifications_thunks'


export default function NotificationCard({ element: notification }) {
    const dispatch = useDispatch()
    const image = notification.user?.profile_pic
    const bg_color =  notification.read_at == null ? 'bg-blue-950' : 'bg-blue-600'
    const post = notification.post
    const comment = notification.comment
    
    function handleClick () {
        if(notification.read_at == null) dispatch(read(notification.id))
        dispatch(setShow(false))
    }

    return (
        <Link 
            to={'/post/'+ post.id + '/comment/'+ (comment?.id ?? 0)}
            onClick={handleClick}
            className={`flex p-3 gap-2 items-start mb-1 rounded-lg ${bg_color}`}>
            <img 
                className="w-12 h-12 border-black border-2 rounded-full p-px" 
                src={image ? profileStorage + image : User} />
            <div >
                <p>{notification.title}</p>
                <p>{post.post}</p>
                <p>{comment?.comment ?? ''}</p>
                <p>{timeAgo(notification.created_at)}</p>
            </div>
        </Link>    
    )
}

NotificationCard.propTypes = {
    element: PropTypes.object,
}