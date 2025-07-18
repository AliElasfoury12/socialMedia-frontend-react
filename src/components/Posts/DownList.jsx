import DeletePost from "./DeletePost"
import PropTypes from 'prop-types'

export default function DownList({post, setShowDownList, setShowEditPostModal}) {

    return (
        <div 
            className="absolute bg-blue-500 rounded-md h-fit p-2 
            -right-4 top-8 flex flex-col z-10 down">
                    
            <button 
                onClick={() => {
                    setShowDownList(false)
                    setShowEditPostModal(true)
                }} 
                className="hover:bg-blue-400 rounded-full px-5">
                Edit
            </button>
            
                <DeletePost id={post?.id}/>
        </div>
    )
}

DownList.propTypes = {
   post: PropTypes.object,
   setShowDownList: PropTypes.func,
   setShowEditPostModal: PropTypes.func
}