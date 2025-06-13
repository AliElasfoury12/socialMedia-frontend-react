import CommentsButton from '../../../Comments/CommentsButton'
import Likes from './Likes'
import PropTypes from 'prop-types'
import SharePost from './sharePost/SharePost'
import { emptyObject } from '../../../../utils/objects'

export default function PostCardFooter({ post }) {

	return (
		<div
			className='flex justify-between m-auto mb-1 w-[28.5rem]' >

			<Likes post = {post} />

			<CommentsButton post={post} />

			<SharePost post={emptyObject(post.shared_post) ? post : post.shared_post}/>

		</div>
	)
}

PostCardFooter.propTypes = {
	post: PropTypes.object
}