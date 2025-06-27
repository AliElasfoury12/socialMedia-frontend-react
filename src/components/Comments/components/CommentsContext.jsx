import { createContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../Modal'
import CommentsShow from './CommentsShow'
import CreateComment from './CreateComment'
import { setShow } from '../../../stores/commentStore'

export const CommentContext = createContext()

export default  function CommentsContext(props) {
	const dispatch = useDispatch()

	const {
		post,
		commentsCount,
		setCommentsCount,
		page,
		setPage,
		comments,
		setComments,
		end,
		setEnd,
		lastPage,
		setLastPage
	} = props

	const { show, postId } = useSelector(state => state.comments)
	
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
			setEnd,
			lastPage,setLastPage
		}}>
			{post.id == postId  && 
				<Modal show={show} setShow={(s) =>dispatch(setShow(s))}>
					<div
						className="flex flex-col m-auto">
						<CommentsShow/> 
						<CreateComment/>       
					</div>
				</Modal>
			}
		</CommentContext.Provider>
	)
}

CommentsContext.propTypes = {
  post: PropTypes.object,
  comments:PropTypes.array,
  setComments: PropTypes.func,
  commentsCount:PropTypes.number,
  setCommentsCount: PropTypes.func,
  page:PropTypes.number,
  setPage: PropTypes.func,
  end:PropTypes.bool,
  setEnd: PropTypes.func,
  lastPage:PropTypes.number,
  setLastPage: PropTypes.func,
}