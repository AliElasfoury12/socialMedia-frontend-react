import { MessageCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostId, setShow } from '../../stores/commentStore'
import PropTypes from 'prop-types'
import countRound from '../../utils/CountRound'
import CommentsShow from './components/CommentsShow'
import Modal from '../Modal'
import CreateComment from './components/CreateComment'


export default function CommentsButton({post}) {
    const dispatch = useDispatch()
    const { show, postId } = useSelector(state => state.comments)
  
    function onCommentButtonClick () {
        dispatch(setPostId(post.id))
        dispatch(setShow(!show))
    }

    return (
        <div>
            <button
                onClick={onCommentButtonClick}
                className='flex bg-blue-500 w-28 justify-center items-center h-7 rounded-full py-4'>
                <MessageCircle className='w-7 mr-1'/>
                <p >{countRound(post.comments_count)}</p>
            </button>

            <Modal show={show && postId == post.id } setShow={(s) => dispatch(setShow(s))}>
                <CommentsShow post={post}/>
                <CreateComment/>
            </Modal>
        </div>
    )
}

CommentsButton.propTypes = {
    post: PropTypes.object
}