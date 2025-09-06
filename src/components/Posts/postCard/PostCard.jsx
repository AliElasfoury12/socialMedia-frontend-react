import PropTypes from 'prop-types'
import PostCardFooter from './components/postCardFooter/PostCardFooter'
import PostCardHeader from './components/postCardHeader/PostCardHeader'
import PostCardBody from './components/Body/PostCardBody'
import { emptyObject } from '../../../utils/objects'

export default function PostCard({element: post}) {

    function SharedPost () {
        return (
            post.shared_post != undefined && !emptyObject(post.shared_post) &&
            <div 
                className='border border-gray-400 my-4 border-x-0 py-2'>
                <PostCardHeader post={post.shared_post} isShared={true}/>
                <PostCardBody   post={post.shared_post}/>
            </div>
        )
    }

    return(
        <div 
            className="h-fit border border-1 border-gray-300 rounded-lg
            py-1 relative bg-slate-100 w-[30rem]">
            
            <PostCardHeader post={post} isShared={false}/>
            <PostCardBody   post={post}/>
            {SharedPost()}
            <PostCardFooter className='flex mb-1' post={post}/> 
        </div>
    )
}

PostCard.propTypes = {
    element: PropTypes.object,
}