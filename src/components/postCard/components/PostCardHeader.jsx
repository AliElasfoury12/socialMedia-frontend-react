import { Link } from 'react-router-dom'
import user from '../../../assets/user.png'
import DownList from '../../Posts/components/DownList'
import PropTypes from 'prop-types'
import { timeAgo } from '../../../utils/Moments'
import Follow from './Follow'
import { profileStorage } from '../../../stores/statices'

export default function PostCardHeader({post}) {
    let storage = profileStorage
  
    return (
        <header
            className="flex justify-between px-2 " 
            style={{width:'29.8rem'}}>

            <section className="flex ">

                <img 
                    className="w-12 h-12 border-blue-950  border-2 p-px rounded-full" 
                    src={post.user.img ? storage + post.user.img : user} /> 
            
                    <div 
                        className='flex flex-col ml-2'>
                        <Link
                            to={`/user/profile/${post.user.id}/posts`} 
                            className="flex text-lg">
                            {post.user.name.length > 23 ? 
                                post.user.name.subString(0,20) + '...':
                                post.user.name 
                            }
                        </Link>

                        <p
                            className='text-xs text-gray-800'>
                            {timeAgo(post.created_at)}
                        </p>
                    </div>

                    <Follow 
                        id={post.user.id} 
                        follows={post.user.follows} 
                        ClassName={'self-start ml-3 mt-px text-blue-950'}/>                
            </section> 

            <DownList post={post}/>
        </header> 
    )
}

PostCardHeader.propTypes = {
    post: PropTypes.object
}