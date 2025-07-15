import PropTypes from 'prop-types'
import Modal from '../Modal'

export default function DeleteConfirmModal({ showConfirmDelete, setShowConfirmDelete, confirmDeleteFunction }) {

 return(
    <Modal show={showConfirmDelete} setShow={setShowConfirmDelete}>
        <div className='w-96 h-40 flex flex-col items-center justify-center gap-4'>
            <h1>Are You Sure?</h1>
            <div className='flex gap-4'>
                <button 
                    className="bg-red-500 text-white rounded-full py-1 w-32"
                    onClick={confirmDeleteFunction} >
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

DeleteConfirmModal.propTypes = {
   showConfirmDelete: PropTypes.bool,
   setShowConfirmDelete: PropTypes.func,
   confirmDeleteFunction: PropTypes.func,
}
