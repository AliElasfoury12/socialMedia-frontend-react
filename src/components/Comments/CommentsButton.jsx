import { MessageCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostId, setShow } from '../../stores/commentStore'
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import countRound from '../../tools/CountRound'
import CommentsModal from './components/CommentsModal'

export const CommentContext = createContext()

export default function CommentsButton({post}) {
    let dispatch = useDispatch()
    let { show, postId } = useSelector(state => state.comments)
    let [showCommentsCount, setShowCommentsCount] = useState('')
    let [comments, setComments] = useState([])
    let [commentsCount, setCommentsCount] = useState(post.commentsCount)
    let [page, setPage] = useState(1)
    let [lastPage, setLastPage] = useState(0)
    let [end, setEnd] = useState(false)

    let commentButton = () => {
        dispatch(setPostId(post.id))
        dispatch(setShow(!show))
    }

    useEffect(() => {
        setShowCommentsCount(countRound(commentsCount))
    },[commentsCount])

  return (
    <div>
         <button
            onClick={commentButton}
            className='flex bg-blue-500 w-28 justify-center items-center h-7 rounded-full py-4'>
            <MessageCircle className='w-7 mr-1'/>
            <p >{showCommentsCount}</p>
        </button>

        <CommentContext.Provider
		value = {{
			post,
			comments,
			setComments,
			commentsCount,
			setCommentsCount,
			page,
			setPage,
            lastPage,
            setLastPage,
			end,
			setEnd
		}}>
			{show && post.id == postId &&
				<CommentsModal/>
			}
		</CommentContext.Provider>

    </div>
  )
}

CommentsButton.propTypes = {
    post: PropTypes.object
}