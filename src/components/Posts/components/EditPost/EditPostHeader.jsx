import { timeAgo } from '../../../../tools/Moments'
import user from '../../../../assets/user.png'
import PropTypes from 'prop-types'
import { profileStorage } from '../../../../stores/statices'

export default function EditPostHeader(props) {
    let { post, edit } = props
    let storage = profileStorage
    return (
        <div className='flex items-center justify-between'>
            <div 
                className="flex items-center">

                <img    
                    className="w-11 h-11 border-black  border-2 rounded-full p-px"
                    src={post.user.img ? storage + post.user.img : user} /> 
        
                <div className='text-center'>
                    <p className="ml-2 text-xl">
                        {post.user.name}
                    </p>

                    <p className='text-xs text-gray-800'>
                        {timeAgo(post.created_at)}
                    </p>
                </div>
            </div>

            <button  
                onClick={edit}
                className=" bg-blue-700 rounded-lg px-4 text-xl">
                Edit
            </button>
        </div>
  )
}

EditPostHeader.propTypes = {
    post: PropTypes.object,
    edit: PropTypes.func,
}