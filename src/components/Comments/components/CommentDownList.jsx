import  more  from '../../../assets/more.png'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setShowList, setEditing, setEditId } from '../../../stores/comments/comments_slice'
import DeleteConfirmModal from '../../Modals/DeleteConfirmModal'
import { useState } from 'react'
import { deleteComment} from '../../../stores/comments/comments_thunks'
import DownList from '../../Common/DownList'
import Alert from '../../alerts/Alert'
import BigLoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import {Alert as _Alert} from '../../../stores/app'

export default function CommentDownList({ comment }) {
    const dispatch = useDispatch()
    const { authUser }  = useSelector(state => state.auth)
    const { editing, editId, showList } = useSelector(state => state.comments)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [ loading, setLoading ] = useState(false)

    function showListFun () {
        dispatch(setEditId(comment.id))
        dispatch(setShowList(!showList) )
    }

    function onDeleteButtonClick () {
        setShowConfirmDelete(true)
        dispatch(setShowList(false))
    }

    function DeleteCommentAlret() {
		return (
			<Alert show={loading} >
				<div>
					<h1 className='text-2xl mb-5'>
						Deleting Comment 
					</h1>
					<BigLoadingSpinner/>
				</div>
			</Alert> 
		)
	}

    async function delete_comment_func () {
        setLoading(true)
        try {
            await dispatch(deleteComment(comment.id))
            setLoading(false)
            dispatch(_Alert('comment deleted successfully'))
        } catch (error) {
            setLoading(false)
        }
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
				confirmDeleteFunction={delete_comment_func}
			/>

            <DeleteCommentAlret/>
      </div>
   )
}

CommentDownList.propTypes = {
   comment: PropTypes.object,
}