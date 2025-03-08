import { createContext } from 'react'
import PropTypes from 'prop-types'
import CommentsModal from './CommentsModal'
import { useSelector } from 'react-redux'

export const CommentContext = createContext()

export default  function Comments(props) {
	let {post,
		commentsCount,
		setCommentsCount,
		page,
		setPage,
		comments,
		setComments,
		end,
		setEnd} = props

	let { show, postId } = useSelector(state => state.comments)
	
	return (
		<CommentContext.Provider
		value = {{
			post,
			comments,
			setComments,
			commentsCount,
			setCommentsCount,
			page,
			setPage,
			end,
			setEnd
		}}>
			{show && post.id == postId  && 
				<CommentsModal/>
			}
		</CommentContext.Provider>
	)
}

Comments.propTypes = {
  post: PropTypes.object,
  comments:PropTypes.array,
  setComments: PropTypes.func,
  commentsCount:PropTypes.number,
  setCommentsCount: PropTypes.func,
  page:PropTypes.number,
  setPage: PropTypes.func,
  end:PropTypes.bool,
  setEnd: PropTypes.func
}