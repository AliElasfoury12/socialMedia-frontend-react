import PropTypes from 'prop-types'
import Delete from '../../API/Delete'
import { CommentContext } from '../CommentsButton'
import { useContext } from 'react'
import { deleteComment} from '../../../stores/commentStore'
import { useDispatch } from 'react-redux'

function DeleteComment(props) {
   let dispatch = useDispatch()

   let {setCommentsCount} = useContext(CommentContext) 
   let id = props.id

    function DeleteComment () {
        dispatch(deleteComment(id))
        setCommentsCount(c => c -1)
        Delete('comments/' + id)
      }
       
 return(
    <button onClick={DeleteComment} 
      className="hover:bg-blue-400 rounded-full px-2">
         Delete
    </button>
 )
}

DeleteComment.propTypes = {
   id: PropTypes.number,
}

export default DeleteComment
