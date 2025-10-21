import { useState } from 'react'
import arrow from '../../../assets/right-arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../stores/comments/comments_thunks'
import PropTypes from 'prop-types'
import Alert from '../../alerts/Alert'
import BigLoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import {Alert as _Alert} from '../../../stores/app'

export default function CreateComment({post}) {
	const dispatch = useDispatch()
	const { authUser }  = useSelector(state => state.auth)
	const [content, setContent] = useState('')
	const [ loading, setLoading ] = useState(false)

    async function submitComment (e) {
		e.preventDefault()
		setLoading(true)
		try {
			await dispatch(createComment({postId: post.id, content, authUser}))
			setContent('')
			setLoading(false)
			dispatch(_Alert('comment created successfully'))
			document.getElementById('comments-show-div').scrollTop = 0
		} catch (error) {
			setLoading(false)
		}
	}

	function CreateCommentForm () {
		return (
			<form
				onSubmit={submitComment} 
				className='relative w-full px-1'>
				<textarea 
					autoFocus
					className='rounded-md mt-2 px-2 min-h-20  resize-none h-fit w-full' 
					placeholder={'Comment as ' + authUser.name}
					value={content}
					onChange={(e) => {setContent(e.target.value)}} />
				<button 
					type='submit'>
					{content.trim() != '' &&       
						<img className='w-4 h-5 absolute bottom-1 right-2' src={arrow} />
					}
				</button> 
			</form> 
		)
	}

	function CreateCommentAlret() {
		return (
			<Alert show={loading} >
				<div>
					<h1 className='text-2xl mb-5'>
						creating comment 
					</h1>
					<BigLoadingSpinner/>
				</div>
			</Alert> 
		)
	}

	return (
		<>
			{CreateCommentForm()}
			<CreateCommentAlret/>
		</>
	)
}

CreateComment.propTypes = {
	post: PropTypes.object
}