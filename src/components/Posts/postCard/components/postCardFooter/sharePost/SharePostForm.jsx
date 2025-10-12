import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SharePost } from '../../../../../../stores/posts/posts_thunks'

export default function SharePostForm ({post, setShow}) {
    const [postContent, setPostContent] = useState('')
    const dispatch = useDispatch()
    
    function handleSubmit (e) {
        e.preventDefault()
        dispatch(SharePost({postContent, post}))
        .then(() => {
            setShow(false)
        })
    }

    return (
        <form>
            <button 
                type='submit' 
                onClick={handleSubmit}   
                className='bg-blue-600 rounded py-1 w-24 float-right mr-2'>
                Share
            </button>
            <textarea
                autoFocus
                onChange={(e) => {setPostContent(e.target.value)}}
                className='resize-none p-2 my-2 focus:outline-none h-40 w-[28rem]' 
                placeholder='Writte Somthing'>
            </textarea>
        </form>
    )
}

SharePostForm.propTypes = {
    post: PropTypes.object,
    setShow: PropTypes.func
}