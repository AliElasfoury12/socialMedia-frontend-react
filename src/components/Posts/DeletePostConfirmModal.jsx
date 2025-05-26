import PropTypes from 'prop-types'
import { deletePost } from '../../stores/postsStore' 
import { useDispatch } from 'react-redux';
import Modal from '../Modal'

export default function DeletePostConfirmModal({ postId, showConfirmDelte, setShowConfirmDelete }) {
   const dispatch = useDispatch()

 return(
    <Modal show={showConfirmDelte} setShow={setShowConfirmDelete}>
        <div className='w-96 h-40 flex flex-col items-center justify-center gap-4'>
            <h1>Are You Sure?</h1>
            <div className='flex gap-4'>
                <button 
                    className="bg-red-500 text-white rounded-full py-1 w-32"
                    onClick={() =>  dispatch(deletePost(postId))} >
                    Confirm
                </button>
                <button 
                    className="bg-red-500 text-white rounded-full py-1 w-32"
                    onClick={() => setShowConfirmDelete(false)} >
                    Cancel
                </button>
            </div>
        </div>
    </Modal>
 )
}

DeletePostConfirmModal.propTypes = {
   postId: PropTypes.number,
   showConfirmDelte: PropTypes.bool,
   setShowConfirmDelete: PropTypes.func,
}
