import arrow from '../../../assets/right-arrow.png'
import {  useState } from 'react'
import PropTypes from 'prop-types'
import Put from '../../API/Put'
import { useDispatch, useSelector } from 'react-redux'
import { setShowList, setEditing } from '../../../stores/commentStore'

export default  function EditComment({ comment }) {
   const dispatch = useDispatch()
   const { authUser }  = useSelector(state => state.auth)
   const { editId, editing } = useSelector(state => state.comments)
   const [commentVale, setCommentValue] = useState(comment.content)

    function edit (e) {
        e.preventDefault()

        Put('comments/' + comment.id,{comment: commentVale})
        .then(() => {
                dispatch(setEditing(false))
                dispatch(setShowList(false))
        }) 
    }
    
  return (
    <div>
         {editing && comment.user.id == authUser.id && comment.id == editId ?
            <form 
                className='relative'
                onSubmit={edit} >
                <input type='text' 
                    value={commentVale}
                    onChange={(e) => {setCommentValue(e.target.value)}} 
                    className='rounded-md my-2 outline outline-2 outline-blue-500 px-2 ml-2'
                    style={{width: '21rem'}} />

                <button type='submit'>
                    {commentVale.trim() != '' &&       
                        <img className='w-4 h-4 absolute top-3 right-2' src={arrow} />
                    }
                </button>
            </form> 

            :   <p
                 className="my-1 ml-12 break-words">
                    {commentVale}
                </p>  
         }
    </div>
  )
}

EditComment.propTypes = {
   comment: PropTypes.object,
 }