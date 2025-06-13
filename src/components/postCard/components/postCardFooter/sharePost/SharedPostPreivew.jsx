import PropTypes from 'prop-types'
import { postsStorage, profileStorage } from '../../../../../stores/statices'

export default function SharedPostPreivew ({post}) {
    return (
        <div 
            className='flex gap-2 self-start items-center'>
            <img 
                src={post.post_imgs != '' ? 
                postsStorage + post.post_imgs[0].img :
                profileStorage + post.user.img}
                className='w-14 h-12' />
            <p>{post.content}</p>
        </div>
    )
}

SharedPostPreivew.propTypes = {
    post: PropTypes.object,
}