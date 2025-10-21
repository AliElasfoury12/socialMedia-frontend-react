import arrow from '../../../assets/right-arrow.png'
import {  useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../../stores/comments/comments_thunks'
import Alert from '../../alerts/Alert'
import BigLoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import {Alert as _Alert} from '../../../stores/app'

export default  function EditComment({ comment }) {
    const dispatch = useDispatch()
    const [content, setContent] = useState(comment.content)
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit (e) {
        e.preventDefault()
        setLoading(true)
        try {
            await dispatch(updateComment({commentId: comment.id, formData: {content: content}}))
            setLoading(false)
            dispatch(_Alert('comment updated successfully'))
        } catch (error) {
            setLoading(false)
        }
    }
    
    function UpdateCommentForm () {
		return (
			<form 
                className='relative w-full'
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit} >
                <textarea 
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}} 
                    className='rounded-md my-2 w-[26rem] px-2 resize-none min-h-20'>
                </textarea>

                <button type='submit'>
                    {content.trim() != '' &&       
                        <img className='w-4 h-4 absolute bottom-3 -right-3' src={arrow} />
                    }
                </button>
            </form> 
		)
	}

	function UpdateCommentAlret() {
		return (
			<Alert show={loading} >
				<div>
					<h1 className='text-2xl mb-5'>
						updating comment 
					</h1>
					<BigLoadingSpinner/>
				</div>
			</Alert> 
		)
	}

    return (
       <>
            {UpdateCommentForm()}
            <UpdateCommentAlret/>
       </>
    )
}

EditComment.propTypes = {
   comment: PropTypes.object,
}