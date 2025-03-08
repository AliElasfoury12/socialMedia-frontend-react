import { useContext, useEffect, useState } from 'react'
import arrow from '../../../assets/right-arrow.png'
import { CommentContext } from '../CommentsButton'
import Post from '../../API/Post'
import { useDispatch, useSelector } from 'react-redux'
import { setPostId, setShow, addComment } from '../../../stores/commentStore'

export default function CreateComment() {
   let dispatch = useDispatch()
   let { authUser }  = useSelector(state => state.auth)
   let {setCommentsCount, post} = useContext(CommentContext) 
   let [comment,setComment] = useState('')
 
    let submitComment = async (e) => {
       e.preventDefault()

       Post('comments', {comment: comment, postId: post.id})
       .then((data) => {
            dispatch(setPostId(post.id))
            dispatch(addComment(data.comment))
            document.getElementById('comments').scrollTop = 0
            dispatch(setShow(true))
            setCommentsCount(c => c + 1)
            setComment('')
       })
    }

    useEffect(() => {
      document.getElementById('commentInput').focus()
    }, [])
    
  return (
    <form 
        onSubmit={submitComment} 
        className='relative w-fit m-auto'>
         <textarea 
            id='commentInput'
            className='outline outline-1 outline-gray-500 rounded-md mt-4 mb-2 px-2 
                ml-1 min-h-20 focus:outline-none focus:border-sky-500 border-2 resize-none h-fit' 
            style={{width: '26rem'}}
            type="text" 
            placeholder={'Comment as ' + authUser.name}
            value={comment ?? ''} 
            onChange={(e) => {setComment(e.target.value)}} />
 
         <button type='submit'>
            {comment.trim() != '' &&       
                <img className='w-4 h-5 absolute bottom-4 right-2' src={arrow} />
            }
         </button> 
      </form>  
  )
}