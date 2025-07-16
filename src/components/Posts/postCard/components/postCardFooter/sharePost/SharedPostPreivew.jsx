import PropTypes from 'prop-types'
import { postsStorage, profileStorage } from '../../../../../../stores/statices'
import userImage from '../../../../../../assets/user.png'

export default function SharedPostPreivew ({post}) {
    
    function imagePreview () {
        if(post.post_imgs != '') return  postsStorage + post.post_imgs[0].img
        if(post.user.img == null) return userImage
        return profileStorage + post.user.img
    }

    return (
        <div 
            className='flex gap-2 self-start items-center'>
            <img 
                src={imagePreview()}
                className='w-14 h-12' />
            <p>{post.content}</p>
        </div>
    )
}

SharedPostPreivew.propTypes = {
    post: PropTypes.object,
}