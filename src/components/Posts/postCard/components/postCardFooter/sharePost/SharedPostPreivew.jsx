import PropTypes from 'prop-types'
import { postsStorage, profileStorage } from '../../../../../../main'
import userImage from '../../../../../../assets/user.png'

export default function SharedPostPreivew ({post}) {
    
    function imagePreview () {
        if(post.post_imgs != '') return  postsStorage + post.post_imgs[0].img
        if(post.user.profile_pic.url == null) return userImage
        return profileStorage + post.user.profile_pic.url
    }

    return (
        <div 
            className='flex gap-2 self-start items-center'>
            <img 
                src={imagePreview()}
                className='w-12 h-12' />
            <p>{post.content}</p>
        </div>
    )
}

SharedPostPreivew.propTypes = {
    post: PropTypes.object,
}