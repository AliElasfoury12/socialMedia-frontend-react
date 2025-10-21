import { MessageCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostId, setShow, setShowList, setEditing } from '../../stores/comments/comments_slice'
import PropTypes from 'prop-types'
import countRound from '../../utils/CountRound'
import ShowComments from './components/ShowComments'
import Modal from '../Modals/Modal'
import CreateComment from './components/CreateComment'

export default function CommentsButton({post}) {    
    const dispatch = useDispatch()
    const { show, postId } = useSelector(state => state.comments)
  
    function onCommentButtonClick () {
        dispatch(setPostId(post.id))
        dispatch(setShow(!show))
    }

    function onClickModalBody () {
        dispatch(setShowList(false))
        dispatch(setEditing(false))
    }

    function setModalShow (s) {
        dispatch(setShow(s))
        onClickModalBody()
    }

    return (
        <div>
            <button
                onClick={onCommentButtonClick}
                className='flex bg-blue-500 w-28 justify-center items-center h-7 rounded-full py-4 z-20'>
                <MessageCircle className='w-7 mr-1'/>
                <p >{countRound(post.comments_count)}</p>
            </button>

            <Modal show={postId == post.id && show} setShow={setModalShow}>
                <div onClick={onClickModalBody}>
                    <ShowComments post={post}/>
                    <CreateComment post={post}/>
                </div>
            </Modal>
        </div>
    )
}

CommentsButton.propTypes = {
    post: PropTypes.object
}