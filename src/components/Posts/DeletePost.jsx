import PropTypes from 'prop-types'
import Delete from '../API/Delete'
import { removePost } from '../../stores/postsStore' 
import { useDispatch } from 'react-redux';

export default function DeletePost({ id }) {
   let dispatch = useDispatch()

   function DeletePost () {
      dispatch(removePost(id))
      Delete('posts/' + id)
   }
       
 return(
    <button onClick={DeletePost} 
      className="hover:bg-blue-400 rounded-full px-2">
         Delete
    </button>
 )
}

DeletePost.propTypes = {
   id: PropTypes.number,
}
