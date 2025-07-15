import  more  from '../../../assets/more.png'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setShowList, setEditing, setEditId } from '../../../stores/commentStore'
import DeleteConfirmModal from '../../Modals/DeleteConfirmModal'
import { useState } from 'react'
import { deleteComment} from '../../../stores/commentStore'
import ShowIf from '../../ShowIf'

export default function CommentDownList({ comment }) {
    const dispatch = useDispatch()
    const { authUser }  = useSelector(state => state.auth)
    const { editing, editId, showList } = useSelector(state => state.comments)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    
    function showListFun  (e) {
        e.stopPropagation()
        dispatch(setEditId(comment.id))
        dispatch(setShowList(!showList) )
    }

    function onDeleteButtonClick () {
        setShowConfirmDelete(true)
        dispatch(setShowList(false))
    }

   return (
        <div className='mt-2 ml-1 relative'>

            {authUser.id == comment.user.id && !editing &&
                <img 
                    className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                    onClick={(e)=> showListFun(e)}
                    src={more} />
            } 
            
            <ShowIf show={showList && !editing && comment.id == editId}>
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bg-blue-500 rounded-md h-fit p-2 right-0 top-6 flex flex-col z-10 down">
                    <button 
                        className="hover:bg-blue-400 rounded-full px-5" 
                        onClick={() => dispatch(setEditing(true))}>
                            Edit
                    </button>
                    <button onClick={onDeleteButtonClick} 
                        className="hover:bg-blue-400 rounded-full px-2">
                        Delete
                    </button>
                </div>
            </ShowIf>
            
            <DeleteConfirmModal 
				showConfirmDelete={showConfirmDelete} 
				setShowConfirmDelete={(s) => setShowConfirmDelete(s)} 
				confirmDeleteFunction={() => dispatch(deleteComment(comment.id))}
			/>
      </div>
   )
}

CommentDownList.propTypes = {
   comment: PropTypes.object,
}