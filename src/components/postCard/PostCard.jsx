import PropTypes from 'prop-types'
import PostCardFooter from './components/postCardFooter/PostCardFooter'
import PostCardHeader from './components/PostCardHeader'
import PostCardBody from './components/PostCardBody'

export default function PostCard(props) {
    let {element: post} = props

    return(
        <div 
          className="h-fit border border-1 border-gray-800 rounded-lg
          my-3 py-1 relative bg-slate-100"
          style={{width: '30rem'}}>
            
            <PostCardHeader post={post}/>
            <PostCardBody   post={post}/>

            {post.shared_post != '' &&
                <div 
                    className='border border-black my-4 border-x-0 p-2'>
                    <PostCardHeader post={post.shared_post}/>
                    <PostCardBody   post={post.shared_post}/>
                </div>
            }

            <PostCardFooter className='flex mb-1' post={post}/> 

        </div>
    )
}

PostCard.propTypes = {
   element: PropTypes.object
}