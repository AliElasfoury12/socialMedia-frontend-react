import PropTypes from 'prop-types'
import user from '../../../assets/user.png'
import { Link } from 'react-router-dom'
import CommentDownList from './CommentDownList'
import EditComment from './EditComment'
import { timeAgo } from '../../../tools/Moments'
import { profileStorage } from '../../../stores/statices'

export default function CommentsCard(props) {
  let { element: comment } = props
  let storage = profileStorage

    return (
        <div  className='flex relative'>
            <div 
                className=" w-fit h-fit mt-2"
                style={{maxWidth: '25rem'}}>
                <div className="flex">
                    <div className="flex">
                        <img 
                            className="w-10 h-10 border-black  border-2 rounded-full p-px" 
                            src={comment.user.img ?  storage + comment.user.img : user} /> 
                       <div 
                            className='text-left ml-2'>
                            <Link
                                to={'user/profile/' + comment.user?.id}>
                                {comment.user?.name}
                            </Link>
                            <p 
                                className='text-xs text-gray-800'>
                                {timeAgo(comment.created_at)}
                            </p>
                       </div>
                    </div> 
                </div> 

                <div>
                    <EditComment comment = {comment}/>
                </div>
            </div>
            <div className='mt-3 relative'>
                    <CommentDownList  comment={comment} />
            </div>
        </div> 
    )
}

CommentsCard.propTypes = {
  element: PropTypes.object,
}
