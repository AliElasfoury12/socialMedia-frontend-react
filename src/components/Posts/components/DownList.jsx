import DeletePost from "./DeletePost"
import more from '../../../assets/more.png'
import PropTypes from 'prop-types'
import { setShowEditModal, setEditId, setShowList } from '../../../stores/postsStore' 
import { useDispatch, useSelector } from "react-redux"
import Modal from "../../../Modal"
import EditPost from "./EditPost/EditPost"

export default function DownList({post}) {
   const dispatch = useDispatch()

   let {showEditModal, editId, showList}  = useSelector(state => state.posts)
   let {authUser}  = useSelector(state => state.auth)

    let showListFun = (postId) => {
        dispatch(setEditId(postId))
        dispatch(setShowList(!showList))
    }

    let edit = () => {
        dispatch(setShowEditModal(true))
        dispatch(setShowList(false))
    } 

    let component = () => {
        return  <EditPost post={post} />
    }

   return (
      <div>
            {authUser?.id == post.user?.id && 
                <img 
                    className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                    onClick={()=>(showListFun(post.id))}
                    src={more}/> 
            } 
            {(showList && editId == post.id) &&
                <div 
                    className="absolute bg-blue-500 rounded-md h-fit p-2 
                    -right-4 top-8 flex flex-col z-10 down">
                           
                    <button 
                        onClick={edit} 
                        className="hover:bg-blue-400 rounded-full px-5">
                        Edit
                    </button>
                  
                     <DeletePost id={post?.id}/>
                </div>
            }

            {showEditModal && editId == post.id && 
                <Modal 
                    show={showEditModal} 
                    setShow={setShowEditModal} 
                    type={'dispatch'} 
                    Component={component}/>
            }
      </div>
   )
}

DownList.propTypes = {
   post: PropTypes.object,
}