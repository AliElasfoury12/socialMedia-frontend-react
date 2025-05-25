import PropTypes from 'prop-types'
import { deletePost } from '../../stores/postsStore' 
import { useDispatch } from 'react-redux';

export default function DeletePost({ id }) {
   const dispatch = useDispatch()

 return(
    <button onClick={() =>  dispatch(deletePost(id))} 
      className="hover:bg-blue-400 rounded-full px-2">
         Delete
    </button>
 )
}

DeletePost.propTypes = {
   id: PropTypes.number,
}
