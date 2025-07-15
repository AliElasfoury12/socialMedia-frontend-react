import { useParams } from 'react-router-dom'
import PostCard from '../Posts/postCard/PostCard'
import { useEffect, useState } from 'react'
import Get from '../API/Get'
import BigLoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import CommentsCard from '../Comments/components/CommentsCard/CommentsCard'

export default function ShowPost() {
	let { post_id, comment_id } = useParams()
	let [post, setPost] = useState([])
	let [comment, setComment] = useState([])
	let [loading, setLoading] = useState(true)

	useEffect(()=> {
		Get('notifications/post/' + post_id +'/comment/' + comment_id)
		.then((data) => {
			setLoading(false)
			setPost(data.post)
			setComment(data.comment)
		})
	},[post_id, comment_id])

	if(loading) {
		return (
		<div className='mt-20'>
			<BigLoadingSpinner/>
		</div>
	)}

	return (
		<div className='w-fit m-auto mt-20'>
			<PostCard element={post}/>
			{comment != '' &&
				<div className='border border-black p-2 bg-white -mt-5 rounded-lg border-t-white'>
					<CommentsCard element={comment}/>
				</div>
			}
		</div>
	)
}
