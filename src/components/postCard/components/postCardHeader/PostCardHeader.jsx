import DownList from '../../../Posts/DownList'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import more from '../../../../assets/more.png'
import { useState } from 'react'
import PostCardHeaderRight from './PostCardHeaderRight'
import EditPostModal from '../../../Posts/EditPostModal'
import DeletePostConfirmModal from '../../../Posts/DeletePostConfirmModal'

export default function PostCardHeader({post}) {
    const {authUser}  = useSelector(state => state.auth)
    const [showDownList, setShowDownList] = useState(false)
    const [showEditPost ,setShowEditPostModal] = useState(false)
    const [showConfirmDelte, setShowConfirmDelete] = useState(false)

    return (
        <header
            className="flex justify-between px-2 w-[30rem]">
            <PostCardHeaderRight post={post}/>
            
            <section>
                {authUser?.id == post.user.id && 
                    <img 
                        className="hover:bg-slate-400 rounded-full p-1 h-6 w-6" 
                        onClick={()=>(setShowDownList(!showDownList))}
                        src={more}/> 
                } 

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
                    
                <DeletePostConfirmModal
                    postId={post.id}
                    showConfirmDelte={showConfirmDelte}
                    setShowConfirmDelete={setShowConfirmDelete}/>
            </section>       
        </header> 
    )
}

PostCardHeader.propTypes = {
    post: PropTypes.object
}