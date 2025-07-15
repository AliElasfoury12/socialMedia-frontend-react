import { useEffect, useState } from 'react'
import arrow from '../../../assets/right-arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../stores/commentStore'
import PropTypes from 'prop-types'

export default function CreateComment({post}) {
	const dispatch = useDispatch()
	const { authUser }  = useSelector(state => state.auth)
	const [content, setContent] = useState('')
 
    function submitComment (e) {
		e.preventDefault()
		dispatch(createComment({postId: post.id, content, authUser}))
		.then(() => {
			setContent('')
			document.getElementById('comments-show-div').scrollTop = 0
		})
	}

	useEffect(() => {
		document.getElementById('commentInput').focus()
	}, [])

	return (
		<form 
			onSubmit={submitComment} 
			className='relative w-full px-1'>
			<textarea 
				id='commentInput'
				className='rounded-md mt-2 px-2 min-h-20  resize-none h-fit w-full' 
				placeholder={'Comment as ' + authUser.name}
				value={content}
				onChange={(e) => {setContent(e.target.value)}} />
	
			<button type='submit'>
				{content.trim() != '' &&       
					<img className='w-4 h-5 absolute bottom-1 right-2' src={arrow} />
				}
			</button> 
		</form>  
	)
}

CreateComment.propTypes = {
	post: PropTypes.object
}