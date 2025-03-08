import CommentsButton from '../../../Comments/CommentsButton'
import Likes from './Likes'
import PropTypes from 'prop-types'
import SharePost from './SharePost'

export default function PostCardFooter(props) {
	let { post } = props

	return (
		<div
			className='flex justify-between m-auto mb-1' 
			style={{width:'28.5rem'}}>

			<Likes post = {post} />

			<CommentsButton post={post} />

			<SharePost post={post.shared_post != '' ? post.shared_post : post}/>

		</div>
	)
}

PostCardFooter.propTypes = {
	post: PropTypes.object
}