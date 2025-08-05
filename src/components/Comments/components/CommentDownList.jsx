import  more  from '../../../assets/more.png'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setShowList, setEditing, setEditId } from '../../../stores/commentStore'
import DeleteConfirmModal from '../../Modals/DeleteConfirmModal'
import { useState } from 'react'
import { deleteComment} from '../../../stores/commentStore'
import DownList from '../../Common/DownList'

export default function CommentDownList({ comment }) {
    const dispatch = useDispatch()
    const { authUser }  = useSelector(state => state.auth)
    const { editing, editId, showList } = useSelector(state => state.comments)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    
    function showListFun () {
        dispatch(setEditId(comment.id))
        dispatch(setShowList(!showList) )
    }

    function onDeleteButtonClick () {
        setShowConfirmDelete(true)
        dispatch(setShowList(false))
    }

   return (
        <div 
            onClick={(e) => e.stopPropagation()}
            className='mt-2 ml-1 relative'>

            {authUser.id == comment.user.id && !editing &&
                <img 
                    className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                    onClick={(e)=> showListFun(e)}
                    src={more} />
            } 
            
            <DownList
                postion={'right-0 top-6'}
                showList={showList && !editing && comment.id == editId}
                onEdit={() => dispatch(setEditing(true))}
                onDelete={onDeleteButtonClick}
            />
            
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