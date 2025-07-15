import  more  from '../../../assets/more.png'
import PropTypes from 'prop-types'
import DeleteComment from './DeleteComment'
import { useDispatch, useSelector } from 'react-redux'
import { setShowList, setEditing, setEditId } from '../../../stores/commentStore'

export default function CommentDownList({ comment }) {
    const dispatch = useDispatch()
    const { authUser }  = useSelector(state => state.auth)
    const { editing, editId, showList } = useSelector(state => state.comments)


    function showListFun  (e) {
        e.stopPropagation()
        dispatch(setEditId(comment.id))
        dispatch(setShowList(!showList) )
    }

   return (
        <div className='mt-2 ml-1 relative'>

            {authUser.id == comment.user.id && !editing &&
                <img 
                    className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                    onClick={(e)=> showListFun(e)}
                    src={more} />
            } 
            
            {showList && !editing && comment.id == editId && 
                <div 
                    className="absolute bg-blue-500 rounded-md h-fit p-2 right-0 top-6 flex flex-col z-10 down">
                    <button 
                        className="hover:bg-blue-400 rounded-full px-5" 
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(setEditing(true))
                        }}>
                            Edit
                    </button>
                    <DeleteComment id={comment.id}/>
                </div>
            }
      </div>
   )
}

CommentDownList.propTypes = {
   comment: PropTypes.object,
}