import PropTypes from 'prop-types'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import Delete from '../../../API/Delete'
import { postsStorage } from '../../../../stores/statices'
import ImagesPreview from '../createPost/ImagesPreview'

export default function EditPostFooter(props) {
    let { postVal, setPostVal, postError, post, imgs, setImgs } = props
    let storage = postsStorage
    let [images, setImages] = useState(post.post_imgs )

    let deleteImg = (id) => {
        setImages(images.filter((image) => image.id != id ))
        Delete('delete-image/'+ id)
    }

    let showImgs = images.map((img, index) => {
        return ( 
            <div 
                className='relative'
                key={index}>
                <img  className="w-24 h-20" src={storage + img.img} />
                <Trash
                    onClick={() => deleteImg(img.id)} 
                    className='w-5 text-red-600 absolute top-1 right-1'/>
            </div>
        )
    })

    return (
        <div className='flex flex-col'>
            <textarea 
               value={postVal} 
               onChange={(e) => {
                 setPostVal(e.target.value)
                 }}
               className="my-3 px-2 border-blue-700 rounded-md 
               border-2 break-words min-h-20 resize-none text-xl"
               type="text" />

           <p
                className="text-red-700 text-sm ml-2">
                {postError}
            </p>

            <div
                className="flex gap-2 self-start my-4">
                {showImgs}
            </div>

            <ImagesPreview imgs={imgs} setImgs={setImgs} />
            
        </div>
    )
}

EditPostFooter.propTypes = {
    postVal: PropTypes.string,
    setPostVal: PropTypes.func,
    postError: PropTypes.string,
    post: PropTypes.object,
    imgs:PropTypes.array,
    setImgs: PropTypes.func,
}