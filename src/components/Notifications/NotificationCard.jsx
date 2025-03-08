import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import  User  from '../../assets/user.png'
import { timeAgo } from "../../tools/Moments"
import { profileStorage } from '../../stores/statices'
import { useDispatch } from 'react-redux'
import { read, setShow } from '../../stores/NotificationsStore'

export default function NotificationCard({ element: notification }) {
    let dispatch = useDispatch()
    let image = notification.user?.img
    let storage = profileStorage

    return (
        <Link 
            to={'/post/'+ notification.post.id + '/comment/'+ (notification.comment?.id ?? 0)}
            onClick={() =>{ 
                if( notification.read_at == null){
                    console.log(notification.id);
                    dispatch(read(notification.id))
                }
                dispatch(setShow(false))
                console.log(notification);
            }}
            className="flex p-3 gap-2 items-start mb-1 bg-blue-600 rounded-lg"
            style={{ opacity: notification.read_at == null ? '0.7' : '' }}>
            <img 
                className="w-12 h-12 border-black border-2 rounded-full p-px" 
                src={image ? storage + image : User} />
            <div >
                <p>{notification.title}</p>
                <p>{notification.post.post}</p>
                <p>{notification.comment?.comment ?? ''}</p>
                <p>{timeAgo(notification.created_at)}</p>
            </div>
        </Link>    
    )
}

NotificationCard.propTypes = {
    element: PropTypes.object,
}