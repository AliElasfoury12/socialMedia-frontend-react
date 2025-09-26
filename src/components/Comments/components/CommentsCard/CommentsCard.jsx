import PropTypes from 'prop-types'
import CommentDownList from '../CommentDownList'
import EditComment from '../EditComment'
import CommentsCardHeader from './CommentsCardHeader'
import { useSelector } from 'react-redux'
import { Else, If, IfElse } from '../../../Common/IfElse'

export default function CommentsCard({ element: comment }) {
    const { authUser }  = useSelector(state => state.auth)
    const { editId, editing } = useSelector(state => state.comments)

    return (
        <div  className='flex relative'>
            <div 
                className="w-fit h-fit mt-2 max-w-[25rem]">
                <CommentsCardHeader comment={comment}/>
                <IfElse condition={editing && comment.user.id == authUser.id && comment.id == editId}>
                    <If>
                        <EditComment comment = {comment}/>
                    </If>
                    <Else>
                        <p className="my-1 ml-12 break-words max-w-[21rem]"> {comment.content} </p>
                    </Else>
                </IfElse>
            </div>
            <CommentDownList  comment={comment} />
        </div> 
    )
}

CommentsCard.propTypes = {
  element: PropTypes.object,
}
