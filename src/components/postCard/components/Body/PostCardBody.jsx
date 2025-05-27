import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../API/APIMethods'
import Gallery from './Gallery'
import ImagesPreview from './ImagesPreview'

export default function PostCardBody({ post }) {
    const [Post, setPost] = useState(post.content ?? '')
    const [images, setImages] = useState(post.post_imgs ?? [])
    const [show, setShow] = useState(false)

    function getPost (){
        api.GET('posts/'+ post.id)
        .then((data)=> {
            setPost(data)
        })
    }

    useEffect(() =>{        
        setImages(post.post_imgs)
        setPost(post.content )
    },[post])

  
    return (
        <div>
            <div 
                onClick={() => {if(Post.length >= 83) setPost(Post.substr(0,80)+ '...')}}
                className="w-96 text-left text-lg my-3 mx-2 select-text">
                {Post}

                { Post.length == 83 && 
                    <button onClick={getPost} className='text-sm text-blue-700 '>
                        show more
                    </button>
                }
            </div>

           {images.length > 0 && <ImagesPreview images={images} setShow={setShow}/> }
            <Gallery images={images} show={show} setShow={setShow}/>
        </div>
    )
}

PostCardBody.propTypes = {
    post: PropTypes.object
}