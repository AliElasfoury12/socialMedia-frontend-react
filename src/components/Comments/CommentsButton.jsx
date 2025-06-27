import { MessageCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostId, setShow } from '../../stores/commentStore'
import PropTypes from 'prop-types'
import { createContext, useState } from 'react'
import countRound from '../../utils/CountRound'
import CommentsContext from './components/CommentsContext'

export const CommentContext = createContext()

export default function CommentsButton({post}) {
    const dispatch = useDispatch()
    const { show } = useSelector(state => state.comments)
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState(post.commentsCount)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [end, setEnd] = useState(false)

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
            <p >{countRound(commentsCount) ?? 0}</p>
        </button>

        <CommentsContext {...{
            post,commentsCount,setCommentsCount,page,setPage,comments,setComments,end,setEnd,lastPage,setLastPage
        }}/>
    </div>
  )
}

CommentsButton.propTypes = {
    post: PropTypes.object
}