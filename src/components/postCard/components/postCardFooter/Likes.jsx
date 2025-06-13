import PropTypes from 'prop-types'
import likeIcon from '../../../../assets/like.png'
import blueLike from '../../../../assets/bluelike.png'
import { useEffect, useState } from 'react'
import countRound from '../../../../utils/CountRound'
import api from '../../../API/APIMethods'

export default function Likes({ post }) {
    const [liked, setLiked] = useState(post.isLikedByAuthUser)
    const [likesCount, setLikesCount] = useState(post.likes_count)
    const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false)

  
    function like () {
        setIsLikeButtonDisabled(true)
        setLiked(!liked)
        liked ? setLikesCount(l => l-1) : setLikesCount (l => l+1)

        api.GET('like/' + post.id,{
            headers:{
                'X-Socket-ID': window.Echo.socketId()
            }
        }).then(() => setIsLikeButtonDisabled(false))
    }

	useEffect(() => {
		window.Echo.private('like')
		.listen('LikeEvent', (data) => {
			if(data.postId == post.id) {
				console.log(data.likes);
				setLikesCount(data.likes)
			}
		})
	}, [])

    return (
        <button 
            onClick={like} 
            disabled={isLikeButtonDisabled}
            className='flex items-center justify-center bg-blue-500 w-28 h-7 py-4 rounded-full'>
            <img src={liked ? blueLike : likeIcon} className='w-6 mr-2' />
            <p>{countRound(likesCount)}</p>
        </button>
    )
}

Likes.propTypes = {
   post: PropTypes.object,
}