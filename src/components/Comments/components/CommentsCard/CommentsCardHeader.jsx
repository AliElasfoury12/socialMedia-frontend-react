import PropTypes from 'prop-types'
import { timeAgo } from '../../../../utils/Moments'
import { profileStorage } from '../../../../stores/statices'
import user from '../../../../assets/user.png'
import { Link } from 'react-router-dom'

export default function CommentsCardHeader ({comment}) {
    return (
        <div className="flex">
            <img 
                className="w-10 h-10 border-black  border-2 rounded-full p-px" 
                src={comment.user.profile_pic.url ?  profileStorage + comment.user.profile_pic.url : user} /> 
            <div 
                className='text-left ml-2'>
                <Link
                    to={'user/profile/' + comment.user.id}>
                    {comment.user.name}
                </Link>
                <p 
                    className='text-xs text-gray-800'>
                    {timeAgo(comment.created_at)}
                </p>
            </div>
        </div> 
    )
}

CommentsCardHeader.propTypes = {
    comment: PropTypes.object,
}