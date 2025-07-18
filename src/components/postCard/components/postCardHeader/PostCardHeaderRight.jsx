import PropTypes from 'prop-types'
import { profileStorage } from '../../../../stores/statices'
import { Link } from 'react-router-dom'
import userLogo from '../../../../assets/user.png'
import { timeAgo } from '../../../../utils/Moments'
import Follow from '../Follow'

export default function PostCardHeaderRight({post}) {
    const storage = profileStorage
    const user = post.user

    return (
      <section className="flex ">
            <img 
                className="w-12 h-12 border-blue-950  border-2 p-px rounded-full" 
                src={user.img ? storage + user.img : userLogo} /> 
        
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
                    id={user.id} 
                    follows={user.follows} 
                    ClassName={'self-start ml-3 mt-px text-blue-950'}/>                
        </section> 
    )
}

PostCardHeaderRight.propTypes = {
    post: PropTypes.object
}