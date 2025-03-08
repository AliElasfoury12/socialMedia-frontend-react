import  more  from '../../../assets/more.png'
import PropTypes from 'prop-types'
import DeleteComment from './DeleteComment'
import { useDispatch, useSelector } from 'react-redux'
import { setShowList, setEditing, setEditId } from '../../../stores/commentStore'

export default function CommentDownList(props) {
    let dispatch = useDispatch()

    let { authUser }  = useSelector(state => state.auth)
    let { editing, editId, showList } = useSelector(state => state.comments)

    let { comment } = props

    let showListFun = () => {
        dispatch(setEditId(comment.id))
        dispatch(setShowList(!showList) )
    }

    window.addEventListener('click',  (e) => {
        let commentList = document.getElementById("comment-list")
        e.target != commentList &&  dispatch(setShowList(!showList) )         
    })
   
   return (
      <div>
            {authUser.id == comment.user.id && !editing &&
                <img 
                    id='comment-list'
                    className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                    onClick={()=>(showListFun())}
                    src={more} />
            } 
            {showList && !editing && comment.id == editId && 
                <div 
                    className="absolute bg-blue-500 rounded-md h-fit p-2 
                    -right-8 top-6 flex flex-col z-10 down">
                           
                    <button 
                        className="hover:bg-blue-400 rounded-full px-5" 
                        onClick={() => {dispatch(setEditing(true))}}>
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