import PropTypes from 'prop-types'
import CommentDownList from '../CommentDownList'
import EditComment from '../EditComment'
import CommentsCardHeader from './CommentsCardHeader'


export default function CommentsCard({ element: comment }) {

    return (
        <div  className='flex relative'>
            <div 
                className="w-fit h-fit mt-2 max-w-[25rem]">
                    <CommentsCardHeader comment={comment}/>
                <div>
                    <EditComment comment = {comment}/>
                </div>
            </div>
            <CommentDownList  comment={comment} />
        </div> 
    )
}

CommentsCard.propTypes = {
  element: PropTypes.object,
}
