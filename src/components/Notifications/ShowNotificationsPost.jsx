import { Link, useNavigate, useParams } from 'react-router-dom'
import PostCard from '../Posts/postCard/PostCard'
import { useEffect, useState } from 'react'
import BigLoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import CommentsCard from '../Comments/components/CommentsCard/CommentsCard'
import { Get } from '../API/APIMethods'
import DefaultLayout from '../layouts/DefaultLayout'
import {IfElse, If, Else} from '../Common/IfElse'
import { AlertCircle } from 'lucide-react'

export default function ShowNotificationsPost() 
{
	const {post_id, comment_id } = useParams()
	const [post, setPost] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(()=> {
		Get('notifications/post/' + post_id +'/comment/' + comment_id)
		.then((data) => {
			setLoading(false)
			setPost(data.post)			
		})
	},[post_id, comment_id])

	if(loading) {
		return (
		<div className='mt-20'>
			<BigLoadingSpinner/>
		</div>
	)}

	function NotFound () {
		return (
			<div className='mt-20'>
				<div className="mx-auto mb-8 h-20 w-20 rounded-2xl flex items-center justify-center bg-white shadow-md ring-1 ring-gray-200"> 
					<AlertCircle className="h-10 w-10 text-gray-500" /> 
				</div>
				<h1 className='text-2xl'>This post or Comment maybe deleted</h1>
				<div className="mt-10 flex items-center justify-center gap-4">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="rounded-2xl px-5 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-100 active:scale-[.98] transition">
						Go Back
					</button>
					<Link
						to="/"
						className="inline-flex items-center rounded-2xl bg-black px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 active:scale-[.98]">
						Home
						<span className="ml-2">&rarr;</span>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<DefaultLayout>
			<IfElse condition={post != null}>
				<If>
					<div className='w-fit m-auto my-20'>
						<PostCard element={post}/>
						{post?.comment &&
							<div className='border border-gray-400 p-2 bg-white -mt-2 rounded-lg border-t-white'>
								<CommentsCard element={post.comment}/>
							</div>
						}
					</div>	
				</If>
				<Else>
					<NotFound/>
				</Else>
			</IfElse>
		</DefaultLayout>
	)
}
