import PropTypes from 'prop-types'
import { profileStorage } from '../../../../../stores/statices'
import { Link } from 'react-router-dom'
import userLogo from '../../../../../assets/user.png'
import { timeAgo } from '../../../../../utils/Moments'
import Follow from './Follow'
import { useDispatch } from 'react-redux'
import { followPostUser } from '../../../../../stores/postsStore'

export default function PostCardHeaderLeft({post}) {
    const user = post.user
    const dispatch = useDispatch()

    return (
        <section className="flex ">
            <img 
                className="w-12 h-12 border-blue-950  border-2 p-px rounded-full" 
                src={user.profile_pic?.url ? profileStorage + user.profile_pic.url : userLogo} /> 
        
            <div 
                className='flex flex-col ml-2'>
                <Link
                    to={`/user/profile/${user.id}/posts`} 
                    className="flex text-lg">
                    {user.name.length > 23 ? 
                        user.name.subString(0,20) + '...':
                        user.name 
                    }
                </Link>

                <p
                    className='text-xs text-gray-800'>
                    {timeAgo(post.created_at)}
                </p>
            </div>

            <Follow 
                userId={user.id} 
                follows={user.is_auth_user_follows} 
                followFunction={() => dispatch(followPostUser(user.id))}
                ClassName={'self-start ml-3 mt-px text-blue-950'}/>                
        </section> 
    )
}

PostCardHeaderLeft.propTypes = {
    post: PropTypes.object
}