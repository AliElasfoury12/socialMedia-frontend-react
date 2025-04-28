import PropTypes from 'prop-types'
import { useEffect} from 'react'

export default function CreatePostInput(props) {
    let { post, setPost, error} = props

    useEffect(() => {
        document.getElementById('post-input')?.focus()
      }, [])

    return (
        <>
            <textarea 
                id="post-input"
                placeholder="Share Your Thoughts..." 
                value={post}
                onChange={(e) => {setPost(e.target.value)}}
                className="resize-none h-40 border-t border-b border-black p-2 mb-2 focus:outline-none"
                style={{width: '27.8rem'}}>   
            </textarea>
            <p 
                className="text-red-600 self-start m-2">
                {error}
            </p>
        </>
    )
}

CreatePostInput.propTypes = {
    post: PropTypes.string,
    setPost: PropTypes.func,
    error: PropTypes.string,
}
