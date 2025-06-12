import PropTypes from 'prop-types'
import PostCardHeaderLeft from './PostCardHeaderLeft'
import DownlistButton from './DownlistButton'

export default function PostCardHeader({post}) {
   
    return (
        <header
            className="flex justify-between px-2 w-[30rem]">
            <PostCardHeaderLeft post={ post }/>
            <DownlistButton post={ post } />
        </header> 
    )
}

PostCardHeader.propTypes = {
    post: PropTypes.object
}