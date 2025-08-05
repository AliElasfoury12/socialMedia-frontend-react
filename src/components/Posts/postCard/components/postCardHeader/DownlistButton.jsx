import PropTypes from 'prop-types'
import more from '../../../../../assets/more.png'
import { useState } from 'react'
import EditPostModal from '../../../EditPostModal'
import DownList from '../../../../Common/DownList'
import DeleteConfirmModal from '../../../../Modals/DeleteConfirmModal'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../../../../stores/postsStore'

export default function DownlistButton ({post}) {
    const [showDownList, setShowDownList] = useState(false)
    const [showEditPost ,setShowEditPostModal] = useState(false)
    const [showConfirmDelte, setShowConfirmDelete] = useState(false)
    const dispatch = useDispatch()

    function onEditDownlistButtonFun () {
        setShowDownList(false)
        setShowEditPostModal(true)
    }
    
    function onDeleteDownlistButtonFun  () {
        setShowConfirmDelete(true)
        setShowDownList(false)
    }

    return (
        <section>
            <img 
                className="hover:bg-slate-400 rounded-full p-1 h-6 w-6 " 
                onClick={()=>(setShowDownList(!showDownList))}
                src={more}/> 
            
            <DownList 
                postion={'-right-4 top-6'}
                showList={showDownList}
                onEdit={onEditDownlistButtonFun}
                onDelete={onDeleteDownlistButtonFun}/>
            
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