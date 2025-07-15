import PropTypes from 'prop-types'
import CommentDownList from '../CommentDownList'
import EditComment from '../EditComment'
import CommentsCardHeader from './CommentsCardHeader'
import { useSelector } from 'react-redux'

export default function CommentsCard({ element: comment }) {
    const { authUser }  = useSelector(state => state.auth)
    const { editId, editing } = useSelector(state => state.comments)

    return (
        <div  className='flex relative'>
            <div 
                className="w-fit h-fit mt-2 max-w-[25rem]">
                    <CommentsCardHeader comment={comment}/>
                    
                    {editing && comment.user.id == authUser.id && comment.id == editId ?
                        <EditComment comment = {comment}/>
                        : <p className="my-1 ml-12 break-words"> {comment.content} </p>
                    }
            </div>
            <CommentDownList  comment={comment} />
        </div> 
    )
}

CommentsCard.propTypes = {
  element: PropTypes.object,
}
