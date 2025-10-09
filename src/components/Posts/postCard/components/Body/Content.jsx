import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {api} from '../../../../API/APIMethods'

export default function Content ({post}) {
    const [Post, setPost] = useState(post.content ?? '')
    const [showMore, setShowMore] = useState(false)
    const [fullPost, setFullPost] = useState('')

    useEffect(() =>{        
        setPost(post.content)
    },[post])

    function show_more () {
        if (!fullPost) {
            api.GET('posts/'+ post.id)
            .then((data)=> {
                setFullPost(data.content)
            })
        }
        setShowMore(true)
    }
    
    return (
        <div 
            className="w-96 text-left text-lg m-2">
            <p onClick={() => setShowMore(false)}>
                {showMore ? fullPost : Post}
            </p>

            { Post.length == 83  && !showMore &&
                <button onClick={show_more} className='text-sm text-blue-700 '>
                    show more
                </button>
            }
        </div>
    )
}

Content.propTypes = {
    post: PropTypes.object
}