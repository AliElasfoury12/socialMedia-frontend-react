import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import api from '../../../../API/APIMethods'

export default function SharePostForm ({post, show, setShow}) {
    const [postContent, setPostContent] = useState('')
    
    function sharePost (e) {
        e.preventDefault()
        api.POST('share-post', {post: postContent, shared_post_id: post.id})
        .then(() => {
            setShow(false)
        })
    }

    useEffect(() => {
        document.getElementById('share-post-modal')?.focus()
    }, [show])
    
    return (
        <form>
            <button 
                type='submit' 
                onClick={sharePost}   
                className='bg-blue-600 rounded py-1 w-24 float-right mr-2'>
                Share
            </button>
            <textarea
                id='share-post-modal' 
                onChange={(e) => {setPostContent(e.target.value)}}
                className='resize-none p-2 my-2 focus:outline-none border-black border border-x-0 h-40 w-[28rem]' 
                placeholder='Writte Somthing'>
            </textarea>
        </form>
    )
}

SharePostForm.propTypes = {
    post: PropTypes.object,
    show: PropTypes.bool,
    setShow: PropTypes.func
}