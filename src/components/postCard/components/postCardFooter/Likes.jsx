import PropTypes from 'prop-types'
import likeIcon from '../../../../assets/like.png'
import blueLike from '../../../../assets/bluelike.png'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import countRound from '../../../../utils/CountRound'
import Get from '../../../API/Get'

export default function Likes(props) {
    let [showLikesCount, setShowLikesCount] = useState('')
    let { post } = props
    let likes = post.likes
    let { authUser }  = useSelector(state => state.auth)

    let [liked, setLiked] = useState(false)
    let [likesCount, setLikesCount] = useState(post.likes_count)
   
    let like = () => {
        setLiked(!liked)
        liked ? setLikesCount(l => l-1) : setLikesCount (l => l+1)
        Get('like/' + post.id,{
            headers:{
                'X-Socket-ID': window.Echo.socketId()
            }
        })
        .then((data) => {
        setLikesCount(data.likes)
        })
    }

	useEffect(() => {
		if(likes != '' ){
			likes?.map((user) => {
				if(user.user_id == authUser.id){
					setLiked(true)
				}
			})
		}

		window.Echo.private('like')
		.listen('LikeEvent', (data) => {
			if(data.postId == post.id) {
				console.log(data.likes);
				setLikesCount(data.likes)
			}
		})

	}, [])

    useEffect(() => {
        setShowLikesCount(countRound(likesCount)) 
    }, [likesCount])

    return (
        <button onClick={like} 
            className='flex items-center bg-blue-500 w-28  h-7 justify-center py-4 rounded-full'>
            <img src={liked ? blueLike : likeIcon} className='w-6 mr-2' />
            <p>{showLikesCount}</p>
        </button>
    )
}

Likes.propTypes = {
   post: PropTypes.object,
}