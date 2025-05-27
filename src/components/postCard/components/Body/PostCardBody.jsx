import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Gallery from './Gallery'
import ImagesPreview from './ImagesPreview'
import Content from './Content'

export default function PostCardBody({ post }) {
    const [images, setImages] = useState(post.post_imgs ?? [])
    const [showImagesGallery, setShowImagesGallery] = useState(false)

    useEffect(() =>{        
        setImages(post.post_imgs)
    },[post])

    return (
        <div>
           <Content post={post}/>
           {images.length > 0 && <ImagesPreview {...{images, setShowImagesGallery}} /> }
            <Gallery {...{images, showImagesGallery, setShowImagesGallery}} />
        </div>
    )
}

PostCardBody.propTypes = {
    post: PropTypes.object
}