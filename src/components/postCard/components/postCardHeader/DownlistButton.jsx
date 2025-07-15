import PropTypes from 'prop-types'
import more from '../../../../assets/more.png'
import { useState } from 'react'
import EditPostModal from '../../../Posts/EditPostModal'
import DownList from './DownList'
import DeleteConfirmModal from '../../../Posts/DeleteConfirmModal'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../../../stores/postsStore'

export default function DownlistButton ({post}) {
    const [showDownList, setShowDownList] = useState(false)
    const [showEditPost ,setShowEditPostModal] = useState(false)
    const [showConfirmDelte, setShowConfirmDelete] = useState(false)
    const dispatch = useDispatch()

    return (
        <section>
            <img 
                className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                onClick={()=>(setShowDownList(!showDownList))}
                src={more}/> 
            

            {showDownList &&
                <DownList 
                    post={post} 
                    setShowDownList={setShowDownList} 
                    setShowEditPostModal={setShowEditPostModal}
                    setShowConfirmDelete={setShowConfirmDelete}/>
            }

            <EditPostModal 
                post={post} 
                show={showEditPost} 
                setShow={setShowEditPostModal}/>
                
            <DeleteConfirmModal
                showConfirmDelete={showConfirmDelte}
                setShowConfirmDelete={(s) => setShowConfirmDelete(s)}
                confirmDeleteFunction={() => dispatch(deletePost({postId: post.id}))}/>
        </section>  
    )
}

DownlistButton.propTypes = {
    post: PropTypes.object
}