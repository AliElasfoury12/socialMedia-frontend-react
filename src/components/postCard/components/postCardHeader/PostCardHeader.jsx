import PropTypes from 'prop-types'
import PostCardHeaderLeft from './PostCardHeaderLeft'
import DownlistButton from './DownlistButton'
import { useSelector } from 'react-redux'

export default function PostCardHeader({post, isShared}) {
    const { authUser }  = useSelector(state => state.auth)

    return (
        <header
            className="flex justify-between px-2 w-[30rem]">
            <PostCardHeaderLeft post={ post }/>
            { !isShared && authUser.id == post.user.id && <DownlistButton post={ post } /> }
        </header> 
    )
}

PostCardHeader.propTypes = {
    post: PropTypes.object,
    isShared: PropTypes.bool
}